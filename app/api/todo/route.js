import { connectMongoDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
// import Story from "@/models/story";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req) {
    try {
        await connectMongoDB();
        // Fetch all stories
        const todo = await Todo.find();
        return NextResponse.json(todo);

    } catch (error) {
        console.error('Error fetching stories:', error);
        return NextResponse.status(500).json({ error: 'Internal server error' });
    }
}


export async function POST(req) {
    try {
        const { todoName, description, } = await req.json()

        await connectMongoDB()
        const newTodo = await Todo.create({ todoName, description})
        console.log('new todo',newTodo)
        return NextResponse.json(newTodo)
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}

export async function DELETE(req) {

    const { id } = await req.json()
    console.log(id)

    try {
        await connectMongoDB()

        if (!id) {
            return NextResponse.json({ message: 'Delete Rejected' })
        } else {
            // Fetch a specific todo by id
            const todo = await Todo.findById(id);
            if (todo) {
                const result = await Todo.deleteOne({ _id: id });
                console.log(result)
                return NextResponse.json(result)
            }
            else {
                return NextResponse.json({ message: "Not Found" })
            }
        }
    } catch (error) {
        return NextResponse.json({ error })
    }

}


export async function PUT(req) {
    const a = await req.json();
    const id = a?.id
    // console.log('id', id)
    const updatedTodo = {todoName:a?.todoName, description:a?.description}

    try {
        await connectMongoDB()
        const todo = await Todo.findById(id);
        if (todo) {
            const result = await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
            return NextResponse.json({ status:'Update Successful' })
        } else{
            return NextResponse.json({ status:'Update Fail' })
        } 

    } catch (error) {
        return NextResponse.json(error) 
    }
  }