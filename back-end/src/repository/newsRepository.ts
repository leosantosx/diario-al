import { EntityRepository, Repository } from 'typeorm'
import News from '../models/News'
import dotenv from 'dotenv'
import Aws from 'aws-sdk'

dotenv.config()


import ErrorHandler from '../errors/ErrorHandler'

interface Request {
    pageId: number
}

interface id {
    id: string
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
    
    private getLinksImages(imagesName: any){
        imagesName = imagesName.replace(/\"/g, '')
        imagesName = imagesName.replace(/\{/g, '')
        imagesName = imagesName.replace(/\}/g, '')
        imagesName = imagesName.split(',')

        const images: { Key: string }[] = []
        imagesName.forEach((image: string) => {
            images.push({ Key: image.split('/').slice(-1)[0] })
        })
        
        return images
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

    public async deleteNews({ id }: id){

        const news = await this.findOne({
            where: { id }
        })
        
        if(!news){
            throw new ErrorHandler('News not found')
        }

        const images = this.getLinksImages(news.images)
        this.deleteImageS3(images)
        
        this.delete(news)

        return {
            status: 'Ok'
        }
    }
}

export default NewsRepository