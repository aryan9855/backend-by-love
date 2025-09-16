const Todo = require("../models/Todo")

//define route handler
exports.createTodo = async (req,res)=>{
    try {
        //extract title and description from request body
        const {title, description} = req.body;
        //create a new todo object and insert it in the database
        const response = await Todo.create({title, description});
        //send a json response with a success flag
        res.status(200).json(
        {
            success: true,
            data: response,
            message: "Todo created successfully"
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
