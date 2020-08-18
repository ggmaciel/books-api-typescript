import { Entity, Column, PrimaryColumn } from 'typeorm'
import { IsString, IsEmail } from 'class-validator'

@Entity('users')
export class Users {
    @PrimaryColumn()
    @IsString()
    id!: string

    @Column()
    name!: string

    @Column({ unique: true })
    @IsEmail()
    email!: string

    @Column()
    password!: string

    @Column({ array: true })
    booksRead!: string

    @Column({ array: true })
    readList!: string

    @Column({ array: true })
    favourites!: string
}
