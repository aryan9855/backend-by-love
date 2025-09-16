const Todo = require("../models/Todo")

//define route handler
exports.updateTodo = async (req,res)=>{
    try {
       const {id} = req.params;
       const {title, description} = req.body;
       const todo = await Todo.findByIdAndUpdate(
        id,
        { title, description, updatedAt: Date.now() },
        { new: true, runValidators: true }
       );

       if(!todo){
           return res.status(404).json({
               success: false,
               data: null,
               message: "Todo not found"
           });
       }

       return res.status(200).json({
           success: true,
           data: todo,
           message: "Todo updated successfully"
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
