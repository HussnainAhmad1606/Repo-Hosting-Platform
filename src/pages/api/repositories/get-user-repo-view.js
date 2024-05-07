
import { runQuery } from "@/middlewares/db";
const jwt = require("jsonwebtoken")
const  handler = async(req, res) => {

try {
 let userId = req.body.userId;


   
const response = await runQuery(`SELECT * FROM repository_user_view WHERE user_id=${userId}
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