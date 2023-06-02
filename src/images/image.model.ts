import { BelongsTo, Column, DataType, HasMany, Model, Table, ForeignKey } from "sequelize-typescript";
import { Portfolio } from "src/portfolios/portfolio.model";
import { Comment } from "src/comments/comment.model";

interface ImageCreationAttrs {
    name: string;
    description: string
    comments: string[]
    portfolioId: number 
}

@Table({tableName: 'images'})
export class Image extends Model<Image, ImageCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @ForeignKey(() => Portfolio)
    @Column({type: DataType.INTEGER})
    portfolioId: number

    @BelongsTo(() => Portfolio)
    portfolio: Portfolio

    @HasMany(() => Comment)
    comments: Comment[]
}