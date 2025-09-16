const Todo = require("../models/Todo")

//define route handler
exports.deleteTodo = async (req,res)=>{
    try {
       const {id} = req.params;
       await Todo.findByIdAndDelete(id);
       res.json({
        success: true,
        message: "Todo deleted successfully"
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
