import fetch from 'node-fetch'
import { validateResponse } from '../controller/dto/validator.dto'
import TodoModel from '../model'
import { ITodo } from '../model/model.interface'

export const insertMany = async()=>{
    const apiURL = 'https://jsonplaceholder.typicode.com/todos'
    const data = await (await fetch(apiURL)).json()
    
    await TodoModel.collection.drop()
    await TodoModel.insertMany(data)

    return "ok"
} 

export const getAll = async(skip=0)=>{
    const res = await TodoModel.find().skip(skip).limit(20)
    return res
}

export const insertOne = async(data: any)=>{ 
    const res = await TodoModel.create(data)
    return res
} 

export const deleteById = async(id: any)=>{ 
    const res = await TodoModel.findOneAndDelete(id)
    return res
} 
