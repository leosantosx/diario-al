import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

export default function ensureAuthenticated(
request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new Error('JWT token is missing')
    }

    const [, token] = authHeader.split(' ')

    try{
        const decoded = verify(token, '80f6ec39777d807e9427ed5f5a71fe79')

        next()
    } catch {
        throw new Error('Invalid JWT token')
    }
}