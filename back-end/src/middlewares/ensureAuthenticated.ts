import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import ErrorHandler from '../errors/ErrorHandler'

export default function ensureAuthenticated(
request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization

    if(!authHeader){
        throw new ErrorHandler('JWT token is missing')
    }

    const [, token] = authHeader.split(' ')

    try{
        const decoded = verify(token, '80f6ec39777d807e9427ed5f5a71fe79')

        next()
    } catch {
        throw new ErrorHandler('Invalid JWT token')
    }
}