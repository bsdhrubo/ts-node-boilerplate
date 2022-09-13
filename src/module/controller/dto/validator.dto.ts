import { plainToClass } from "class-transformer";
import { IsBoolean, IsNumber, IsString, MaxLength, MinLength, validate } from "class-validator";

export class RequestDto{
    @IsNumber()
    userId: number

    @IsNumber()
    id: number

    @IsString()
    @MaxLength(10)
    @MinLength(3)
    title: string

    @IsBoolean()
    completed: boolean
}

export const validateRequest = async (data: any)=>{

    console.log('validating....')
    const newData = plainToClass(RequestDto, data);
    const errors = await validate(newData)
    const mapped = errors.map(e =>{
        delete e.target;
        delete e.children;
        return e
    })
    if (mapped.length > 0) {
        console.log('Request validation failed. errors: ',);
        return {success: false, errors: mapped}
    } else {
        return {success: true}
    }
}

export const validateResponse = async (data: any)=>{
    console.log({data})
    console.log('validating....')
    const newData = plainToClass(RequestDto, data);
    const errors = await validate(newData)
    const mapped = errors.map(e =>{
        delete e.target;
        delete e.children;
        return e
    })
    if (mapped.length > 0) {
        console.log('Response validation failed. errors: ');
        return {success: false, errors: mapped}
    } else {
        return {success: true}
    }
}