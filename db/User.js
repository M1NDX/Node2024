const {mongoose} = require("./connectdb")

let userSchema = mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

userSchema.statics.findUsers = async (filter={}, isAdmin = false)=>{
    let proj = isAdmin? {}: {name:1, email:1, _id:0} ;
    let docs = await User.find(filter,proj)
    console.log(docs);
    return docs;
}

userSchema.statics.saveUser = async (userData)=>{
    let newUser = User(userData);
    return await newUser.save()
}

let User = mongoose.model('User', userSchema)
// async function findUsers(){
//     let docs = await User.find({})
//     console.log(docs);
// }
// findUsers()

async function  createAndShow(){
    let doc = await User.saveUser({
        "name": "Gemini",
        "email": "Gemini@google.com",
        "password": "Gemini"
    });
    User.findUsers();
}

// User.findUsers({email: /a/i},true);
// User.findUsers({},true);
// User.findUsers();        
// createAndShow()


module.exports = {User}