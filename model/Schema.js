import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    // username:String,
    // email:String,
    // password:String,
    username:{
        type: String,
        required:[true, 'Username is required']
    },
    email:{
        type: String,
        required:[true, 'Email is required']
    },
    password:{
        type: String,
        required:[true, 'Password is required']
    },
})

const Users = models.user || model('user',UserSchema)

export default Users;