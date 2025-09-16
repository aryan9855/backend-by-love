const Todo = require("../models/Todo")

//define route handler
exports.getTodo = async (req,res)=>{
    try {
        //fetch all todos from the database
        const todos = await Todo.find({});
        //send a json response with a success flag
        res.status(200).json(
        {
            success: true,
            data: todos,
            message: "Todos fetched successfully"
        })
    }
    catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json(
        {
            success: false,
            data: "internal server error",
            message: error.message
        })
    }
}

exports.getTodoById = async (req,res)=>{
    try {
        const id = req.params.id;
        const todo = await Todo.findById({_id:id});

        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found"
            })
        }

        return res.status(200).json({
            success: true,
            data: todo,
            message: "Todo fetched successfully"
        });


    }
    catch (error) {
        console.log(error);
        console.error(error);
        res.status(500).json(
        {
            success: false,
            data: "internal server error",
            message: error.message
        })
    }
}
