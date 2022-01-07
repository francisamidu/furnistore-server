import {model,Schema} from 'mongoose'

const RoleSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }
},{ timestamps:true})

export default model('role',RoleSchema)