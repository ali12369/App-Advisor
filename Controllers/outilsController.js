const {request , response } = require ("express")
const outilsModel = require("../Models/outils")

const getManyOutils= async(request , response) =>{
    let result = await outilsModel.find()
    console.log(result) 
    response.send(result)
}

const getByIdOutils = async(request , response)=>{
    let result = await outilsModel.findById(request.params.id)
    console.log(result)
    response.send(result)
}

const getBymailOutils = async(request , response ) =>{
    let result = await outilsModel.findOne({ email : request.params.email})
    console.log(result)
    response.send(result)
}

const postOutils = async(request , response) =>{
    const input = request.body ; 
    const user = new outilsModel(input) ; 
    user.save ((error , savedUser) => {
        if (error) {
            return response.status(500).json({error : error.message});
        }
        response.status(201).send(savedUser)
    });
}

const putManyOutils = async(request , response ) =>{
    const { ids, input } = request.body;
    const result = await outilsModel.updateMany({ _id: { $in: ids } }, input);
    response.send(result);
}

const putOutilsById = async (request , response) =>{
    input = request.body 
    let result = await outilsModel.findByIdAndUpdate (request.params.id , input , {new : true}) ; 
    response.send(result )
}

const deleteManyOutils = async (request , response) =>{
    const input = request.body
    let result= await outilsModel.deleteMany(input)
    response.send(result)
}

const deleteByIdOutils= async (request , response) =>{
    let result=await outilsModel.findByIdAndDelete(request.params.id)
    response.send(result)
}

let outils ={
    getByIdOutils,
    getBymailOutils,
    getManyOutils,
    postOutils,
    putManyOutils,
    putOutilsById,
    deleteByIdOutils,
    deleteManyOutils
}

module.exports = outils