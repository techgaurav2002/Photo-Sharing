import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from './config';

class Album extends Model {
    public name!: string;
    public status!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Album.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:{
            type:DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        modelName: 'Album',
    }
);

export default Album;