import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from './config';

class Sheard extends Model {
    public email!: string;


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Sheard.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Shear',
    }
);

export default Sheard;