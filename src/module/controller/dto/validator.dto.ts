import { IValidationSchema } from "../../../utils";

export const createTodoSchema: IValidationSchema = {
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