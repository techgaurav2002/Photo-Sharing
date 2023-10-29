import { Model, DataTypes, Sequelize } from 'sequelize';
import sequelize from './config';

class User extends Model {
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
    public address!: string;
    public resetToken!: string | null;
    public resetTokenExpiration!: Date | null;
  

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
          },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
            
        },
        email: {
            type:DataTypes.STRING,
            allowNull:false,
        },
        phone: {
            type:DataTypes.STRING,
            
        },
        password: {
            type:DataTypes.STRING,
        },
        address:{
            type:DataTypes.STRING,
        },
        filename: {
            type:DataTypes.STRING,
            
        },
        resetToken: {
            type: DataTypes.STRING,
            allowNull: true,
          },
          resetTokenExpiration: {
            type: DataTypes.DATE,
            allowNull: true,
          },

    },
    {
        sequelize,
        modelName: 'User',
    }
);

export default User;