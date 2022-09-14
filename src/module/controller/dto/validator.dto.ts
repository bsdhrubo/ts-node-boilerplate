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

type IValidationSchema = {
    [key: string]: IPropertySchema;
  };


const validationSchema: IValidationSchema = {
    userId: {
        type: 'number',
        required: true
    }, 
    id:{
        type: 'number',
        required: true
    }, 
    title:{
        type: 'string',
        required: true,
        maxLength: 10,
        minLength: 3
    },
    completed:{
        type: 'boolean',
        required: true
    }
}

export const validateRequest=(data: any)=>{ 
    const dataKeys = Object.keys(data) 
    let result: IResult = {
        success: true,
        errors: [{key:'', message:''}]
    }
    result.errors.pop()
    for(let [key, value] of Object.entries(validationSchema)){
        const isExist = dataKeys.includes(key) 
        console.log({value})
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