import mongoose, { Schema, models } from "mongoose";
const todoSchema = new Schema({


    todoName: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

}, { timestamps: true })

const Todo = models.Todo || mongoose.model('Todo', todoSchema);

export default Todo;