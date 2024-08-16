'use client';

import Link from "next/link";
import { useEffect, useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/todo');
        const data = await res.json();
        console.log(data);
        setTodos(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleDelete = async (id) => {
    const userConfirmed = confirm("Are you sure you want to delete this item?");
    console.log(id)
    if (userConfirmed) {
      try {
        const res = await fetch("http://localhost:3000/api/todo", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        const data = await res.json();
        if (data) {
          location.reload();
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      return
    }
  };


  return (
    <>
    
    <div className="w-full max-w-[700px] mx-auto bg-white p-[20px] text-[#272727] flex flex-col gap-[15px] mt-[15px] border ">
      <p className="text-center font-bold border-b pb-[10px] text-blue-900">Your Todo Lists ({todos.length})</p>
      {
        todos?.map(todo => (
          <div key={todo?._id} className="flex flex-col gap-[15px] border p-[18px] shadow-lg rounded-lg">
            <div className="flex justify-between items-center ">
              <p className="text-[24px] font-semibold">{todo?.todoName}</p>
              <div className="flex items-center gap-[10px] text-white">
                <Link href={`/update-todo/${todo?._id}`} className="px-[12px] py-[8px] border rounded-[10px] font-semibold text-[18px] bg-[green]">Edit</Link>
                <button onClick={() => handleDelete(todo?._id)} className="px-[12px] py-[8px] border rounded-[10px] font-semibold text-[18px] bg-[red]">Delete</button>
              </div>
            </div>
            <hr />
            <p className="w-full font-medium text-[18px] ">{todo?.description}</p>
          </div>
        ))
      }
    </div></>
  );
}

export default Home