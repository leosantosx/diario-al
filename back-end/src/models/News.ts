import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class News {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    title: string

    @Column()
    content: string

    @Column('text', { array: true })
    images: string[]

    @Column()
    date: string
}

export default News
