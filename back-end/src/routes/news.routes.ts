import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import CreateNewsService from '../services/CreateNewsService'
import NewsRepository from '../repository/newsRepository'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import multer from 'multer'
import config from '../config/upload'

const upload = multer(config)

const newsRoutes = Router()

newsRoutes.get('/', async (request, response) => {
    const newsRepository = getCustomRepository(NewsRepository)

    const news = await newsRepository.find()
    
    response.json(news)
})

newsRoutes.get('/:pageId', async (request, response) => {

    const pageId = parseInt(request.params.pageId)
   
    const newsRepository = getCustomRepository(NewsRepository)

    const pageNews = await newsRepository.getPage({ pageId })
    
    response.json(pageNews)
})

newsRoutes.get('/al/:slug', async (request, response) => {
    const { slug } = request.params

    const newsRepository = getCustomRepository(NewsRepository)
    const news = await newsRepository.findOne({
        where: { slug }
    })

    return response.json(news || {})
})

newsRoutes.post('/', ensureAuthenticated, upload.array('file'), async (request, response) => {
    const { title, content } = request.body

    const createNews = new CreateNewsService()

    const images = request.files.map(
        (file: { location: string }) => file.location)
    
    const news = await createNews.execute({ 
        title,
        content,
        images,
     })

    return response.status(201).json(news) 
})

newsRoutes.delete('/:id', ensureAuthenticated, async (request, response) => {
    const { id } = request.params
    const newsRepositoty = getCustomRepository(NewsRepository)

    const news = await newsRepositoty.deleteNews({ id })

    return response.json(news)

})

export default newsRoutes