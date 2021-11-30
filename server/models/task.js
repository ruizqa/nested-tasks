const mongoose = require( 'mongoose' );
const AutoIncrement = require('mongoose-sequence')(mongoose);

const TaskSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description: {type: String},
    completed: {type: Boolean},
    created_at: {type: Date, default: new Date()},
    updated_at: {type: Date, default: new Date()}

});

TaskSchema.plugin(AutoIncrement, {inc_field: 'id'});
const Task = mongoose.model( 'Task', TaskSchema );

const TaskModel = {
    createTask : function( newTask ){
        return Task.create( newTask );
    },
    getTasks : function(){
        return Task.find();
    },
    getTask : function( Taskdata ){
        return Task.findOne(Taskdata);
    },
    remove: function(Taskdata){
        return Task.remove(Taskdata, {single:true});
    },

    updateTask: function(id,Taskdata){
        return Task.findOneAndUpdate({id:id},{$set:Taskdata},{new:true})
    }
};

module.exports = {TaskModel};