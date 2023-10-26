import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
      type:String,
      default: "-",
    },
    email:{
       type: String,
       required: true,
    },
    password:{
        type: String,
        required: false,
    },
    mobile:{
        type: Number,
        default: 0,
    },
    address: {
        type:String,
    },
    gender: {
        type:String,
        default: "prefer not to say",
    }
});

const User = model("User", UserSchema);

export default User;