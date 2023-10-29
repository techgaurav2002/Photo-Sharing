import  sequelize  from './config';
// import User from './user';

async function main() {
    await sequelize.sync({ force:false}); 

    
}

export default main;