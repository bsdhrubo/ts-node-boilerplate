import fetch from 'node-fetch' 
import { config } from '../../config'
import TodoModel from '../model'

export const insertMany = async()=>{ 
    try {
        const data = await (await fetch(config.externalApiUrl)).json()
        await TodoModel.collection.drop()
        await TodoModel.insertMany(data)
        return await getAll()
    } catch (error) {
        console.log(error);
        return false 
    }
} 

export const getAll = async(page=1)=>{
    const res = await TodoModel.find().skip((page-1)*20).limit(20)
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
