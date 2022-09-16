import {Request, Response, NextFunction } from "express"

interface IPropertySchema {
    type: string
    required: boolean
    maxLength?: number
    minLength?: number
    min?:number
    max?:number
}

interface IResult{
    success: boolean
    errors: [{
        key: string
        message: string
    }]
}

export type IValidationSchema = {
    [key: string]: IPropertySchema;
  };



const validationChecker = (dto:IValidationSchema, data: any)=>{ 
    const dataKeys = Object.keys(data) 
    let result: IResult = {
        success: true,
        errors: [{key:'', message:''}]
    }
    result.errors.pop()
    for(let [key, value] of Object.entries(dto)){
        const isExist = dataKeys.includes(key)  
        if(isExist){
            if(value.type !== typeof data[key]){
                result = makeError(key, `Should be ${value.type} type`, result)
            }else{
                if(value.type === 'string'){ 
                    if(value?.maxLength && (data[key]?.length > value?.maxLength)){
                        result = makeError(key, `Length should be maximum ${value?.maxLength}`, result)
                    }
                    if(value?.minLength && (data[key]?.length < value?.minLength)){
                        result = makeError(key, `Length should be minimun ${value?.minLength}`, result)
                    }
                }
            }
        }else{
            if(value.required){
                result = makeError(key, `Key not found`, result)
            } 
        } 
    } 
    return {...result}
}

const makeError=(key: string, message: string ,result: IResult)=>{
    result.success = false
    result.errors.push({
        key,
        message
    })
    return result
}

export const validateRequest =  (schema: IValidationSchema) => (req: Request, res: Response, next: NextFunction)=>{
    const {success, errors} = validationChecker(schema, req.body)
    if(success){
        next()
    }else{
        res.send(errors)
    }
}