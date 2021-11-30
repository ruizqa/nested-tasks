const {TaskModel} = require( '../models/task' );

const TaskController = {
    getAll : function( req, res ){
        TaskModel
        .getTasks()
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json(err.message))    
    },
    createTask : function( req, res ){

        if(!req.body.title.length <1 || !req.body.description.length <1 || !req.body.completed.length <1){
            let error_m = new Error ()
            error_m.message ='Please fill all fields: title, description and completed'
            res.status(400).json(error_m);
        }
        else{
        keys = ['title', 'description', 'completed', 'created_at', 'updated_at']
        let types = [function(value){return value}, function(value) {return value},function(completed){return (completed === 'true'|| completed === 'True') },
    function(value){return new Date (Date.parse(value))}, function(value){return new Date (Date.parse(value))} ]
        let task={}

        for(let i=0; i<keys.length;i++){
            if(req.body[keys[i]]){
            task[keys[i]] = types[i](req.body[keys[i]])}
        }

        TaskModel
        .createTask(task)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).json(err.message))
    }},
    removeTask : function( req, res ){
        let id= req.params.id;
        
        let task={id:id}
        TaskModel
        .getTask(task)
        .then(data => {
            if(data==null){
                throw new Error('There is no task with that id')
            }
            else{
                TaskModel.remove(task)
                .then(data => res.status(200).json(data))
                .catch(err => res.status(404).json(err.message))
            }})
        .catch(err => res.status(404).json(err.message))
    },
    getTask : function( req, res ){
        
        let id= req.params.id;
        let task={id:id}
        TaskModel
        .getTask(task)
        .then(data => {
            if(data==null){
                throw new Error('There is no task with that id')
            }
            res.status(200).json(data)})
        .catch(err => res.status(404).json(err.message))
    },
    updateTask : function( req, res ){
        if(!req.body.title.length <1 || !req.body.description.length <1 || !req.body.completed.length <1){
            let error_m = new Error ()
            error_m.message ='Please fill all fields: title, description and completed'
            res.status(400).json(error_m);
        }
        let id= req.params.id;
        keys = ['title', 'description', 'completed', 'created_at', 'updated_at']
        let types = [function(value){return value}, function(value) {return value},function(completed){return (completed === 'true'|| completed === 'True') },
    function(value){return new Date (Date.parse(value))}, function(value){return new Date (Date.parse(value))} ]
        let task={}

        for(let i=0; i<keys.length;i++){
            if(req.body[keys[i]]){
            task[keys[i]] = types[i](req.body[keys[i]])}
        }
        
        if(!req.body['updated_at']){
            task['updated_at'] = new Date()
        }

        TaskModel
        .getTask({id:id})
        .then(data => {
            if(data==null){
                throw new Error('There is no task with that id')
            }
            else{
                TaskModel.updateTask(id,task)
                .then(data => res.status(200).json(data))
                .catch(err => res.status(404).json(err.message))
            }})
        .catch(err => res.status(404).json(err.message))
    },
}


module.exports = { TaskController };