import { getRepository } from 'typeorm'
import News from '../models/News'

interface Request {
    title: string
    content: string
    images: string[]
}

class CreateNewsService {
    public async execute({ title, content, images }: Request): Promise<News> {
        const newsRepository = getRepository(News)
        const date = new Date()

        const news = newsRepository.create({
            title,
            content,
            images,
            date: date.toLocaleString()
        })

        await newsRepository.save(news)

        return news
    }
}

export default CreateNewsService