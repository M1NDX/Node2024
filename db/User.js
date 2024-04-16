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

userSchema.statics.findUsers = async (filter={}, 
     isAdmin = false,
     pageSize=4,
     pageNumber=1)=>{
    let proj = isAdmin? {}: {name:1, email:1, _id:0} ;

    //we removed the await to get only the Promise
    let docs =  User.find(filter,proj)
                    .sort({name:1})
                    .skip((pageNumber-1)*pageSize)
                    .limit(pageSize)

    //we removed the await to get only the Promise
    let count = User.find(filter).count()

    // we removed the await in previous lines to execute both queries and wait for both 
    // it is not the same than wait the first to finish to execute the second. 
    let resp = await Promise.all([docs, count])
    let users = resp[0];
    let total =  resp[1];    
    console.log(resp[0], resp[1]);
    return {users, total, page: pageNumber, pageSize}
}

userSchema.statics.saveUser = async (userData)=>{
    let newUser = User(userData);
    return await newUser.save()
}

userSchema.statics.findUser  = async(email)=>{
    let user = await User.findOne({email})
    return user;
}

userSchema.statics.updateUser = async (email, userData)=>{
    // delete userData.email
    let updatedUser = await User.findOneAndUpdate({email},
                                {$set: userData},
                                {new:true}
                            )
    return updatedUser;
}

userSchema.statics.deleteUser = async(email)=>{
    let deleted = await User.findOneAndDelete({email})
    console.log(deleted);
    return deleted;
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
User.findUsers({},false);        
// createAndShow()


module.exports = {User}


