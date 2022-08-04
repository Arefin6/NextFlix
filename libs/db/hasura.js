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

  console.log(response)

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


