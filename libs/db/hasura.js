/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc, operationName, variables) {
    const result = await fetch(process.env.NEXT_PUBLIC_HASURA_ADMIN_URl,
      {
        method: "POST",
        headers:{
            "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SCRECT
        },
        body: JSON.stringify({
          query: operationsDoc,
          variables: variables,
          operationName: operationName
        })
      }
    );
  
    return await result.json();
  }
  
  const operationsDoc = `
    query MyQuery {
      users {
        email
        id
        issuer
        publicAddress
      }
    }
    
    mutation MyMutation {
      insert_users_one(object: {email: "arefin@gmail.com", id: 10, issuer: "arefin", publicAddress: "did:pkj"}) {
        id
      }
    }
    
    query MyQuery{
      __typename
    }
  `;
  
  
  function fetchMyQuery() {
    return fetchGraphQL(
      operationsDoc,
      "MyQuery",
      {}
    );
  }


 export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    // console.log(data);
  }
  