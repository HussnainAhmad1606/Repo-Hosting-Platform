
import { runQuery } from "@/middlewares/db";
const  handler = async(req, res) => {

try {
 let name = req.body.name;
 let description = req.body.description;
 let userId = req.body.userId;


   
const response = await runQuery(`INSERT INTO repository
(name, description, user_id)
VALUES('${name}', '${description}', '${userId}')`, []);

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