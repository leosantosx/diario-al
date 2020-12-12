import { AugmentedAIRuntime } from 'aws-sdk'
import { Router } from 'express'
import AuthenticateAdminService from '../services/AuthenticateAdminService'
import CreateNewAdminService from '../services/CreateNewAdminService'

const sessionsRouter = Router()

sessionsRouter.post('/', async (request, response) => {
    const { email, password, code } = request.body
    const authenticateAdmin = new AuthenticateAdminService()

    const admin = await authenticateAdmin.execute({
         email, 
         password,
         code,
    })

    response.json(admin)
})

sessionsRouter.post('/admin/21232f297a57a5a743894a0e4a801fc3', async (request, response) => {
    const { email, password, code } = request.body
    
    const createNewAdmin = new CreateNewAdminService()
    const admin = await createNewAdmin.execute({
        email, 
        password,
        code,
    })

    return response.status(201).json(admin)
})

export default sessionsRouter

