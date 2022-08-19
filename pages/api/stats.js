import  jwt  from "jsonwebtoken";

export default async function stats(req,res){
   if(req.method === "POST"){
      const token  = req.cookies.token 
     try {
        if(!token){
            res.status(403).send({message:"No Token Found"})
        }
        else{
            const decoded = jwt.verify(token,process.env.HASURA_GRAPHQL_JWT_SECRET)
            console.log({decoded})
            res.send({msg:"it works",decoded})
        }
     } catch (error) {
        console.error("Error occurred /stats",error)
        res.stats(500).send({done:false,error:error.message})
     }
   }
}