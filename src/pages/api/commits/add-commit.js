
import { runQuery } from "@/middlewares/db";
const  handler = async(req, res) => {

try {
 let repoId = req.body.repoId;
 let userId = req.body.userId;
 let message = req.body.message;
 let documentText = req.body.documentText



   
const response = await runQuery(`INSERT INTO commit
(repo_id, user_id, commit_message, document_text)
VALUES('${repoId}', '${userId}', '${message}', '${documentText}')`, []);

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