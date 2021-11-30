const express = require( 'express' );
const TaskRouter = express.Router();
const {TaskController} = require( '../controllers/tasks' );

TaskRouter
    .route( '/tasks' )
    .get(TaskController.getAll)
    .post(TaskController.createTask)

TaskRouter
    .route( '/tasks/:id' )
    .get(TaskController.getTask)
    .delete( TaskController.removeTask )
    .put( TaskController.updateTask );



module.exports = { TaskRouter };