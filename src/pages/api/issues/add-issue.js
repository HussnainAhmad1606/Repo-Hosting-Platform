
import { runQuery } from "@/middlewares/db";
const  handler = async(req, res) => {

try {
 let title = req.body.title;
 let description = req.body.description;
 let userId = req.body.userId;
 let repoId = req.body.repoId;


   
const response = await runQuery(`INSERT INTO issue
(title, description, repo_id, user_id,status)
VALUES('${title}', '${description}', '${repoId}', '${userId}', 'Open')`, []);

var type = "";
if (response.length==0) {
    type = "error"
}
else {
    type= "success"
    return res.status(200).json({type:type, response: response})
    
}


return res.status(200).json({type:type, response: response})

        


}

catch (error) {
    
    console.log(error);
    
    return res.status(200).json({response: error, type: "error"})

}

}

export default handler;