import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from './config';

class Images extends Model {
    public filename!: string;
    public status!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Images.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:{
            type:DataTypes.INTEGER,
            defaultValue: 1,
        },
        ispublic:{
            type:DataTypes.INTEGER,
            defaultValue:0,
        }
    },
    {
        sequelize,
        modelName: 'Images',
    }
);

export default Images;