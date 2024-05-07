import React from "react";
import { toast } from "react-hot-toast";
const Trr = (params) => {

  const returnBook = async() => {
    console.log("Return book")
    const data = {
      borrowId: params.id
    }
    console.log(data);
   
    const req = await fetch("http://localhost:3000/api/books/return-book",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const result = await req.json();
    console.log(result);

 
      
      toast.success(result.message);
      
    
    
  }
  return (
    <tr>
      <th>{params.srNo}</th>
      <td>{params.studentName}</td>
      <td>{params.rollNo}</td>
      <td>{params.librarian}</td>
      <td>{params.borrowDate}</td>
      <td><button onClick={returnBook} className="btn btn-sm btn-primary">Return Book</button></td>
    </tr>
  );
};

export default Trr;
