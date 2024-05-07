import { runQuery } from "@/middlewares/db";
const jwt = require("jsonwebtoken")
const  handler = async(req, res) => {

try {
    let username = req.body.username;
    let password = req.body.password;


   
const response = await runQuery(`SELECT * FROM users WHERE username='${username}' and password='${password}'`, []);

var type = "";
if (response.length==0) {
    type = "error"
}
else {
    type= "success"
    var token = jwt.sign({ username: response.username, email: response.email, avatar: response.avatar}, "repo-hosting");
    return res.status(200).json({type:type, response: response, token: token})
    
}


return res.status(200).json({type:type, response: response})

        


}

catch (error) {
    
    console.log(error);
    
    return res.status(200).json({response: error, type: "error"})

}

}


export default handler;