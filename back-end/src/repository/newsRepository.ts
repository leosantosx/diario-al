import { EntityRepository, Repository } from 'typeorm'
import Aws from 'aws-sdk'
import News from '../models/News'
import ErrorHandler from '../errors/ErrorHandler'
import dotenv from 'dotenv'

dotenv.config()


interface Request {
    pageId: number
}

interface id {
    id: string
}


@EntityRepository(News)
class NewsRepository extends Repository<News> {
    public async getPage({ pageId }: Request ) {
        
        const [news, total] = await this.findAndCount({
            skip: (pageId - 1) * 10,
            take: 10,
        })

        return {
            news,
            count: total,
        }
    }
    

    public async deleteNews({ id }: id) {

        const news = await this.findOne({
            where: { id }
        })
        
        if(!news){
            throw new ErrorHandler('News not found')
        }

        const imagesKeys = this.getKeysImages(news.images)
        this.deleteImageS3(imagesKeys)
        
        await this.remove(news)

        return {
            status: 'Ok'
        }
    }

    private getKeysImages(images: any){
        const imagesKeys: { Key: string }[] = []
        images.forEach((image: string) => {
            let imageKey = image.split('/').slice(-1)[0]
            imagesKeys.push( { Key: imageKey } )
        })
        
        return imagesKeys
    }
    
    private deleteImageS3(images: any){
        const s3 = new Aws.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        })

        const params = {
            Bucket: process.env.BUCKET_NAME, 
            Delete: { 
                Objects: images,
            },  
        }

        s3.deleteObjects(params, function(err, data) {
            if (err) console.log(err, err.stack);
            else console.log('delete', data);
        });
    }
}

export default NewsRepository