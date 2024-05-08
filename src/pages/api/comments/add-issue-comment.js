
import { runQuery } from "@/middlewares/db";
const  handler = async(req, res) => {

try {
 let issueId = req.body.issueId;
 let userId = req.body.userId;
 let comment = req.body.comment;



   
const response = await runQuery(`INSERT INTO comment
(issue_id, user_id, comment_text)
VALUES('${issueId}', '${userId}', '${comment}')`, []);

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