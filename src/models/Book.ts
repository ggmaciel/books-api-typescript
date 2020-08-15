import { Entity, Column, PrimaryColumn } from 'typeorm'
import { IsString, IsArray, IsNumber } from 'class-validator'

@Entity('books')
export class Book {
    @PrimaryColumn()
    @IsString()
    id!: string

    @Column()
    @IsString()
    title!: string

    @Column({ array: true })
    @IsArray()
    authors!: string

    @Column()
    @IsString()
    description!: string

    @Column()
    @IsNumber()
    pageCount!: number

    @Column()
    @IsString()
    imageLink!: string

    @Column()
    @IsNumber()
    pageViews!: number

    @Column()
    @IsString()
    publishedDate!: string

    @Column()
    @IsNumber()
    numberOfReads!: number

    @Column()
    @IsNumber()
    averageRating!: number

    @Column()
    @IsNumber()
    likes!: number

    @Column({ array: true })
    @IsArray()
    reviews!: string
}
