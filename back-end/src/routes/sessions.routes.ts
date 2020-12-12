import { Router } from 'express'
import AuthenticateAdminService from '../services/AuthenticateAdminService'

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

export default sessionsRouter

