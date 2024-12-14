import mongoose from  'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required: true,
        unique: true,
        
    },
    email:{
        type : String,
        required: true,
        unique: true,

    },
    password:{
        type : String,
        required: true,
     
    },
    profilePicture:{
        type: String,
        default: "https://tse3.mm.bing.net/th?id=OIP.ruat7whad9-kcI8_1KH_tQHaGI&pid=Api&P=0&h=180",
    },
    isAdmin: {
        type: Boolean,
        default: false, // false for regular users, true for admins
    },
 }, {timestamps: true});

 const User = mongoose.model('User',userSchema);

 export default User;
  
