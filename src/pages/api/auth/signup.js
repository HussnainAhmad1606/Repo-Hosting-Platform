import { runQuery } from "@/middlewares/db";

const  handler = async(req, res) => {

try {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    console.log(username, password)

    console.log(`INSERT INTO users(username, email, password) values ('${username}', '${email}', '${password}')`)
   
const response = await runQuery(`INSERT INTO users(username, email, password) values ('${username}', '${email}', '${password}')`, []);

if (response.length==0) {
    return res.status(200).json({type: "error", message: "Error occured while creating your account",data: data})

}
else {
    return res.status(200).json({type: "success", message: "Account created success",data: data})
}

}

catch (error) {
    
    console.log(error);
    
    return res.status(200).json({data: error})

}

}


export default handler;