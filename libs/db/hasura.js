export async function createNewUser(token,metadata){
  const operationsDoc = `
  mutation createNewUser($issuer: String!, $email: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email, issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;
  const { issuer, email, publicAddress } = metadata;
  const response =  await queryHasuraGQL(operationsDoc, "createNewUser",{ email, issuer,publicAddress},token);
   
  console.log({response})
  return response

}


export async function isNewUSer(token,issuer){
  const operationsDoc = `
  query isNewUser ($issuer : String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;
  
  const response =  await queryHasuraGQL(operationsDoc, "isNewUser",{ issuer},token);


   console.log(response.errors)

  return response?.users?.length === 0

}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
  const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}


