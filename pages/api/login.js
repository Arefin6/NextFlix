// eslint-disable-next-line import/no-anonymous-default-export
import {magicAdmin} from '../../libs/magic';
import jwt from "jsonwebtoken";
import { isNewUSer,createNewUser } from '../../libs/db/hasura';
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req,res){
   if(req.method === "POST"){
   try {
     const auth = req.headers.authorization;
     const didToken = auth ? auth.substr(7) : "";

     const metadata = await magicAdmin.users.getMetadataByToken(didToken)
     const token = jwt.sign(
      {
        ...metadata,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${metadata.issuer}`,
        },
      },
      process.env.JWT_SECRET
    );

    console.log({token})

    const isNewUserQuery = await isNewUSer(token,metadata.issuer) 

      if(isNewUserQuery){
        //create anew User
        
      const createNewUserMutation = await createNewUser(token,metadata)

      console.log(createNewUserMutation)

       res.send({done:true,msg:"New User"})
      }
      else{
        res.send({done:true,msg:"Not New User"})
      }

   } catch (error) {
    console.error("Error Logging In",error);
    res.status(500).send({done:false})
   }
  }
  else{
    res.send({done:false})
  }
}