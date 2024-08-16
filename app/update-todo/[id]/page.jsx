"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditTodo = () => {
  const router = useRouter();
  const [todo, setTodo] = useState([]);

  const params = useParams();
  const id = params?.id;
  //   console.log('params',params?.id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/todo");
        const data = await res.json();
        setTodo(data.find((element) => id == element._id));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // console.log('todo l',todo)

  const handleUpdateTodo = async (e) => {
    e.preventDefault();

    const todoName = e.target.todoName.value;
    const description = e.target.description.value;
    const updatedTodo = { id, todoName, description };
    console.log(updatedTodo);

    try {
      const res = await fetch("http://localhost:3000/api/todo", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });

      const data = await res.json();
      console.log(data);
      if (data) {
        router.push("/");
      }
      console.log(data._id);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
   
    <div className="w-full max-w-[700px] mx-auto mt-[15px] bg-[#f5f5f5] p-[20px]">
      <form
        onSubmit={handleUpdateTodo}
        className="flex flex-col gap-4  items-end"
      >
        <input
          type="text"
          name="todoName"
          id=""
          className="px-[20px] py-[15px] shadow w-full border text-[#727272] font-semibold outline-none"
          defaultValue={todo?.todoName}
        />
        <input
          type="text"
          name="description"
          id=""
          className="px-[20px] py-[15px] shadow w-full border text-[#727272] font-semibold outline-none"
          defaultValue={todo?.description}
        />
        <input
          type="submit"
          value="Update Todo"
          className="px-[20px] py-[15px] shadow w-fit border text-[#fff] font-semibold outline-none bg-green-700"
        />
      </form>
    </div>
    </>
  );
};

export default EditTodo;
