
import { runQuery } from "@/middlewares/db";
const  handler = async(req, res) => {

try {
 let repoId = req.body.repoId;


   
const response = await runQuery(`SELECT * FROM commit_repo_view WHERE repo_id=${repoId}
`, []);
console.log(response)

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