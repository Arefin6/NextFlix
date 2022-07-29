// eslint-disable-next-line import/no-anonymous-default-export
import {magicAdmin} from '../../libs/magic';
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (req,res){
   if(req.method === "POST"){
   try {
     const auth = req.headers.authorization;
     const didToken = auth ? auth.substr(7) : "";
     console.log({didToken})

     const metaData = await magicAdmin.users.getMetadataByToken(didToken)
     console.log({metaData})

     res.send({done:true})
   } catch (error) {
    console.error("Error Logging In",error);
    res.status(500).send({done:false})
   }
  }
  else{
    res.send({done:false})
  }
}