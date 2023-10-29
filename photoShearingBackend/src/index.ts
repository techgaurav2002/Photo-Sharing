import express, { application } from "express"
import sequelizeConnection from './models/config';
import main from "./models/main";
import path from 'path';
import userRouter from "./routes/userRoutes";
import albumRouter from "./routes/albumRoutes";
import settingRouter from "./routes/settingRoutes";
import imageRouter from "./routes/imageRoutes"
import loginAuthRoute from "./routes/loginAuthRoutes";
import ForgotAuthRoutes from "./routes/forgotAuthRoutes";
import cors from 'cors';

import User from "./models/user";
import Settings from "./models/settings"
import Sheard from "./models/sheard"
import Images from "./models/images"
import Album from "./models/album";
import sheardRouter from "./routes/sheardRoutes";
const app = express();

try {
    sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  main();
  app.use(express.json());
  app.use(express.urlencoded({extended: true}));


User.hasMany(Album);
Album.belongsTo(User);
User.hasMany(Images);
Images.belongsTo(User);
Album.hasMany(Images);
Images.belongsTo(Album);

Album.hasMany(Settings);
Settings.belongsTo(Album);
User.hasMany(Settings);
Settings.belongsTo(User);

User.hasMany(Sheard);
Sheard.belongsTo(User);

Album.hasMany(Sheard);
Sheard.belongsTo(Album);

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

  app.use("/",ForgotAuthRoutes)
  app.use("/",loginAuthRoute)
  app.use("/user",userRouter);
  app.use("/album",albumRouter);
  app.use("/images",imageRouter);
  app.use("/setting",settingRouter);
  app.use("/sheard",sheardRouter);

app.listen(3000,()=>{
    console.log("Running server on 3000");
    
})
