import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Comment } from "src/comments/comment.model";
import { Image } from "src/images/image.model";
import { Portfolio } from "src/portfolios/portfolio.model";

interface UserCreationAttrs {
    email: string;
    password: string
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => Portfolio)
    portfolios: Portfolio[]

    @HasMany(() => Image)
    images: Image[]

    @HasMany(() => Comment)
    comments: Comment[]
}