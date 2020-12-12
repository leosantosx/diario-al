import { Json } from 'aws-sdk/clients/robomaker'
import { json } from 'express'
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class News {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    content: string

    @Column()
    slug: string

    @Column('json')
    images: Json

    @Column()
    date: string
}

export default News
