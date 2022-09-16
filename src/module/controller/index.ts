import {Request, Response, Router} from 'express'
import { validateRequest } from '../../utils'
import { deleteById, getAll, insertMany, insertOne } from '../service' 
import { createTodoSchema } from './dto/validator.dto'

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
router.post('/insert-one', validateRequest(createTodoSchema), async (req: Request, res: Response)=>{
    const response = await insertOne(req.body)
    res.send(response)
})
router.delete('/delete/:id', async (req: Request, res: Response)=>{
    const response = await deleteById(req.params.id)
    res.send(response)
})

export default router