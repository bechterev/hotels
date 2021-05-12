import {sequelize} from './database'
import  express from "express";
import * as bodyParser from "body-parser";
import  helmet from "helmet";
import  cors from "cors";
const getRoutes = require( "./routes");
import "reflect-metadata";
import { Reservation} from '../models/reservation.model'
import { User} from '../models/user.model'
import { Room} from '../models/room.model'
import {Hotel} from '../models/hotel.model'



sequelize.addModels(['../models'])

 sequelize.authenticate().then(
  async connection => {
    // Create a new express application instance
    const app = express();

    // Call midlewares
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
   // app.use(helmet());
    app.use(express.json());
    //Set all routes from routes folder
    app.use("/", getRoutes);
    
    app.listen(3002, async() => {
      console.log("Server started on port 3002!");
      try{
        sequelize.addModels([User,Reservation,Room,Hotel])
      //await sequelize.sync({force:true})
      }
      catch(e){
        console.log(e)
      }
    });
  })
  .catch(error => console.log(error));
 
