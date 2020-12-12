import { getRepository } from 'typeorm'
import Admin from '../models/Admin'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface Request {
    email: string
    password: string
    code: string
}

interface IAdmin {
    user: Admin
    token: string
}

class AuthenticateAdminService {
    public async execute({ email, password, code }: Request): Promise<IAdmin>{
        const adminRepository = getRepository(Admin)

        // const hashedPassword = await hash(password, 8)

        // const user = adminRepository.create({
        //     email, 
        //     password: hashedPassword, 
        //     code
        // })

        // await adminRepository.save(user)

        const user = await adminRepository.findOne({ 
            where: { email }
        })
        
        if(!user){
            throw new Error('Invalid credentials')
        }
        
        if(user.code !== code){
            throw new Error('Invalid credentials')
        }

        const passwordMatched = await compare(password, user.password)

        if(!passwordMatched){
            throw new Error('Invalid credentials')
        }

        const token = sign({}, '80f6ec39777d807e9427ed5f5a71fe79', {
            subject: user.id,
            expiresIn: '5d',
        })
        
        delete user.password

        return {
            user, 
            token
        }

    }
}

export default AuthenticateAdminService