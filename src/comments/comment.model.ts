import { BelongsTo, Column, DataType, HasMany, Model, Table, ForeignKey } from "sequelize-typescript";
import { Image } from "src/images/image.model";

interface CommentCreationAttrs {
    text: string;
}

@Table({tableName: 'comments'})
export class Comment extends Model<Comment, CommentCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @ForeignKey(() => Image)
    @Column({type: DataType.INTEGER})
    imageId: number

    @BelongsTo(() => Image)
    image: Image
}