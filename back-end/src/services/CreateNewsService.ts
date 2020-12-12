import { Json } from 'aws-sdk/clients/robomaker'
import { getRepository } from 'typeorm'
import News from '../models/News'

interface Request {
    title: string
    content: string
    images: Json
}

class CreateNewsService {
    private parserSlug(title: string) {
        title = title || ''
        const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;άαβγδεέζήηθιίϊΐκλμνξοόπρσςτυϋύΰφχψωώ'
        const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------aavgdeeziitiiiiklmnxooprsstyyyyfhpoo'
        const p = new RegExp(a.split('').join('|'), 'g')

        return title.toString().trim().toLowerCase()
            .replace(/ου/g, 'ou')
            .replace(/ευ/g, 'eu')
            .replace(/θ/g, 'th')
            .replace(/ψ/g, 'ps')
            .replace(/\//g, '-')
            .replace(/\s+/g, '-')        
            .replace(p, c => b.charAt(a.indexOf(c)))  
            .replace(/&/g, '-and-')       
            .replace(/[^\w\-]+/g, '')     
            .replace(/\-\-+/g, '-')       
            .replace(/^-+/, '')      
            .replace(/-+$/, '') 
    }

    public async execute({ title, content, images }: Request): Promise<News> {
        const newsRepository = getRepository(News)

        const date = new Date()

        const news = newsRepository.create({
            title,
            slug: this.parserSlug(title),
            images,
            content,
            date: date.toLocaleString(),
        })

        await newsRepository.save(news)

        return news
    }
}

export default CreateNewsService