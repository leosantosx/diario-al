import { hash } from "bcryptjs"
import { getRepository } from "typeorm"
import Admin from "../models/Admin"

interface Request {
    email: string
    password: string
    code: string
}

class CreateNewAdminService {
    public async execute({ email, password, code }: Request): Promise<Admin>{
        const adminRepository = getRepository(Admin)

        const hashedPassword = await hash(password, 8)

        const admin = adminRepository.create({
            email, 
            password: hashedPassword, 
            code,
        })

        await adminRepository.save(admin)

        delete admin.password

        return admin
    }
}

export default CreateNewAdminService