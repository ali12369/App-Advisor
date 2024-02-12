const {request , response} = require ("express")
const userModel = require ("../Models/user") 
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');

const getManyuser = async(request , response) => {
    let result = await userModel.find() 
    console.log(result)
    response.send(result)
}

const getByIduser = async(request , response) =>{
    let result = await userModel.findById(request.params.id)
    response.send(result) ;
}

const getBymailUser = async (request , response) => {
    const result = await userModel.findOne({ email : request.params.email}) ; 
    response.send(result) ; 
}

const postUser = (request , response) => {
    const input = request.body ; 
    const user = new userModel(input) ; 
    user.save ((error , savedUser) => {
        if (error) {
            return response.status(500).json({error : error.message});
        }
        response.status(201).send(savedUser)
    });
}

const putManyUser = async (request , response) =>{
const { ids, input } = request.body;
const result = await userModel.updateMany({ _id: { $in: ids } }, input);
response.send(result);
};

const putUserById = async (request , response )=> {
    input = request.body 
    let result = await userModel.findByIdAndUpdate (request.params.id , input , {new : true}) ; 
    response.send(result )
}
const deleteManyuser = async(request,response)=>{
    const input = request.body
    let result= await userModel.deleteMany(input)
    response.send(result)
}
const deleteByIduser=async(request,response)=>{
    let result=await userModel.findByIdAndDelete(request.params.id)
    response.send(result)
}
const me = async (request, response) => {
    let user = request.user
    response.send(user)
       }
    

const signup = async (request, response) => {
    let input = request.body;
    let userExist = await userModel.findOne({ email: input.email });
    if (userExist) {
      return response.status(400).json({ msg: "email already used !" });
    }
    let hashedPassword = await bcrypt.hash(input.password, 10);
    input.password = hashedPassword;
    let newUser = new userModel(input);
    let result = await userModel.create(newUser);
    return response.status(201).json(result);
  };


  

  const signin = async (request, response) => {

    let input = request.body;
    let userExist = await userModel.findOne({ email: input.email });
    if (!userExist) {
        return response.status(404).json({ msg: "user not found !" });
    }
    let validPass =await bcrypt.compare(input.password, userExist.password)
     if(!validPass)
     {
         return response.status(400).json({msg:"inncorrect password!"});
     }
            let token = jwt.sign({ userId: userExist._id }, "TOKEN-CRYPTER", {
              expiresIn: "24h",
            });
            response.cookie("token", token);
            return response.status(200).json({
              user: userExist,
              token,
            });
        }
       
   async function me(request, response) {
    let user = request.user
    response.send(user)
}

const user = {
    getManyuser,
    getByIduser,
    postUser,
    putManyUser,
    putUserById,
    deleteManyuser,
    deleteByIduser,
    getBymailUser,
    signin, 
    signup, 
    me

   } ;

module.exports = user 