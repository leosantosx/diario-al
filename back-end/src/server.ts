import 'reflect-metadata'
import './database'

import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import routes from './routes'
import ErrorHandler from './errors/ErrorHandler'

const app = express()
app.use(express.json())
app.use(routes)

// app.use(async (
// err: Error, 
// request: Request, 
// response: Response, 
// next: NextFunction ) => {
//     if(err instanceof ErrorHandler){
//         return response.status(err.statusCode).json({
//             status: 'error',
//             message: err.message
//         })
//     }

//     return response.status(500).json({
//         status: 'error',
//         message: 'Server internal error'
//     })
// })

app.listen(3000, () => console.log('Server running on port 3000'))