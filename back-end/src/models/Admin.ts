import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
class Admin {
    @PrimaryGeneratedColumn('uuid')
    id: string
    
    @Column()
    email: string

    @Column()
    password?: string

    @Column()
    code: string
}

export default Admin