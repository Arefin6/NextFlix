async function insertStats(
  token,
  { favourited, userId, watched, videoId }
  ) {
    const operationsDoc = `
    mutation insertStats($favourited: Int!, $userId: 
    String!, $watched: Boolean!, $videoId: String!) {
      insert_stats_one(object: {favourited: $favourited, 
      userId: $userId,
       watched: $watched, 
       videoId: $videoId}
      ) {
        favourited
        id
        userId
      }
    }
    `;
  return  await queryHasuraGQL(operationsDoc, "insertStats",{favourited, userId, watched, videoId },token);
  }


async function updateStats(
token,
{ favourited, userId, watched, videoId }
) {
const operationsDoc = `
mutation updateStats( $favourited: Int!, $userId: String!, $watched: Boolean!, $videoId: String!) {
update_stats(
  _set: {watched: $watched, favourited: $favourited}, 
  where: {
    userId: {_eq: $userId}, 
    videoId: {_eq: $videoId}
  }) {
  returning {
    userId,
    watched,
    videoId,
    favourited
  }
}
}
`;
return  await queryHasuraGQL(operationsDoc, "updateStats",{favourited, userId, watched, videoId },token);
}

async function findVideoIdByUser(userId,videoId,token){
  const operationsDoc = `
  query findVideoByUserId($userId: String!,$videoId : String!) {
    stats(where: {userId: {_eq: $userId}, videoId: {_eq:$videoId}}) {
      id
      favourited
      userId
      videoId
      watched
    }
  }
`;
  const response =  await queryHasuraGQL(operationsDoc, "findVideoByUserId",{userId,videoId},token);
  return response?.data?.stats
}



async function createNewUser(token,metadata){
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
  return response
}


async function isNewUser(token,issuer){
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
   

   return response?.data?.users?.length === 0;

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

export {isNewUser, createNewUser,findVideoIdByUser,updateStats,insertStats}


