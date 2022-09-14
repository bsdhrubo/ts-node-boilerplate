import {Request, Response, Router} from 'express'
import { deleteById, getAll, insertMany, insertOne } from '../service'
import {validateRequest } from './dto/validator.dto'

const router = Router()

router.get('/', (req, res)=>{
    res.send("Server Working")
})

router.get('/data', async (req, res)=>{
    const response = await getAll()
    res.send(response)
})

router.get('/insert-many', async (req, res)=>{
    const response = insertMany()
    res.send(response)
})
router.post('/insert-one',  async (req: Request, res: Response)=>{
    //validate req
    console.log(req.body)
    const {success, errors} = await validateRequest(req.body)
    if(success){
        const response = await insertOne(req.body)
        res.send(response)
    }else{
        res.send(errors)
    }
})
router.delete('/delete/:id', async (req, res)=>{
    console.log(req.params.id)
    const response = deleteById(req.params.id)
    res.send(response)
})

export default router