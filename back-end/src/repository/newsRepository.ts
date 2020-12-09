import { EntityRepository, Repository } from 'typeorm'
import News from '../models/News'

import ErrorHandler from '../errors/ErrorHandler'

interface Request {
    pageId: number
}

@EntityRepository(News)
class NewsRepository extends Repository<News> {
    public async getPage({ pageId }: Request ) {

        const [ news, total ] = await this.findAndCount({
            take: pageId
        })
        
        if(pageId <= 0 || pageId > total){
            throw new ErrorHandler('Invalid parameter')
        }

        return {
            news,
            count: total,
            remain: total - pageId,
        }
    }
}

export default NewsRepository