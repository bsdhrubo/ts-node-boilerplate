import {Request, Response, Router} from 'express'
import { deleteById, getAll, insertMany, insertOne } from '../service'
import {validateRequest } from './dto/validator.dto'

const router = Router()

router.get('/', (req: Request, res: Response)=>{
    res.send("Server Working")
})

router.get('/all', async (req: Request, res: Response)=>{
    const page = parseInt(req.query.page as string) || 1
    const response = await getAll(page)
    res.send(response)
})

router.get('/insert-many', async (req: Request, res: Response)=>{
    const response = await insertMany() 
    res.send(response)
})
router.post('/insert-one',  async (req: Request, res: Response)=>{
    //validate req
    console.log(req.body)
    const {success, errors} = await validateRequest(req.body)
    console.log(success)
    if(success){
        const response = await insertOne(req.body)
        res.send(response)
    }else{
        res.send(errors)
    }
})
router.delete('/delete/:id', async (req: Request, res: Response)=>{
    console.log(req.params.id)
    const response = await deleteById(req.params.id)
    res.send(response)
})

export default router