'use client'
import {useRouter } from 'next/navigation';
import React from 'react';

const AddTodo = () => {
    
    const router = useRouter()
    
    const handleAddTodo  = async (e)=>{
        e.preventDefault()
      const todoName =  e.target.todoName.value
      const description =  e.target.description.value
      const todo = {todoName,description}
      try {
        const res = await fetch('http://localhost:3000/api/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(todo),
        });
  
        const data = await res.json();
        if(data){
            router.push('/')
        }
        // console.log(data._id)
      } catch (error) {
        console.error('Error:', error);
      }

    }
    return (
       <>
       
        <div className='w-full max-w-[700px] mx-auto mt-[15px] bg-[#f5f5f5] p-[20px]'>
            <form onSubmit={handleAddTodo} className='flex flex-col gap-4  items-end'>
                <input type="text" name="todoName" id="" className='px-[20px] py-[15px] shadow w-full border text-[#727272] font-semibold outline-none' placeholder='Add Toto Title' />
                <input type="text" name="description" id="" className='px-[20px] py-[15px] shadow w-full border text-[#727272] font-semibold outline-none' placeholder='Add Toto Title' />
                <input type="submit" value="Add Todo" className='px-[20px] py-[15px] shadow w-fit border text-[#fff] font-semibold outline-none bg-green-700' />
            </form>
        </div></>
    );
};

export default AddTodo;