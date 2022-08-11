import { magicAdmin } from "../../libs/magic";
import jwt from "jsonwebtoken";
import { createNewUser, isNewUser } from "../../libs/db/hasura";

export default async function login(req, res) {
  if (req.method === "POST") {
    try {
      const auth = req.headers.authorization;
      const didToken = auth ? auth.substr(7) : "";

      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

      const token = jwt.sign(
        {
          ...metadata,
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${metadata.issuer}`,
          },
        },
        process.env.HASURA_GRAPHQL_JWT_SECRET
      );
        
     console.log({token}) 

      const isNewUserQuery = await isNewUser(token, metadata.issuer);
      isNewUserQuery && (await createNewUser(token, metadata));
      res.send({ done: true });
    } catch (error) {
      console.error("Something went wrong logging in", error);
      res.status(500).send({ done: false });
    }
  } else {
    res.send({ done: false });
  }
}