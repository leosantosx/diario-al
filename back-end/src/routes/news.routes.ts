import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import CreateNewsService from '../services/CreateNewsService'
import NewsRepository from '../repository/newsRepository'

import multer from 'multer'
import config from '../config/upload'

const upload = multer(config)

const newsRoutes = Router()

newsRoutes.get('/:id', async (request, response) => {
    const id = parseInt(request.params.id)

    const newsRepository = getCustomRepository(NewsRepository)

    const pageNews = await newsRepository.getPage({ pageId: id })
    
    response.json(pageNews)
})

newsRoutes.post('/', upload.array('file'), async (request, response) => {
    const { title, content } = request.body
    const createNews = new CreateNewsService()

    const images = request.files.map(file => file.location)
    
    const news = await createNews.execute({ 
        title,
        content,
        images,
     })

    return response.json(news) 
})

export default newsRoutes