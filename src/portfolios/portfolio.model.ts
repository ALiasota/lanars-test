import {
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Model,
  Table,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Image } from 'src/images/image.model';

interface PortfolioCreationAttrs {
  name: string;
  description: string;
  userId: number;
}

@Table({ tableName: 'portfolios' })
export class Portfolio extends Model<Portfolio, PortfolioCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;

  @HasMany(() => Image)
  images: Image[];
}
