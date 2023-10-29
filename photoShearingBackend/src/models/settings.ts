import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from './config';

class Settings extends Model {
    public approval!: string;

    public ispublic!: string;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Settings.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        approval: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ispublic:{
            type:DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Settings',
    }
);

export default Settings;