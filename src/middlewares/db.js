import mysql from "mysql2/promise";

export async function runQuery(query, data) {

try {

const db = await mysql.createConnection({

host: "127.0.0.1",

port: 3306,

database: "repo-hosting",

user: "root",

password: ""

})

const [result] = await db.execute(query, data);

await db.end();

return result;

} catch (error) {

console.log(error);
return error;

}

}