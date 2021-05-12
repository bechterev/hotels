import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import {User} from '../../models/user.model';
import { validate } from 'class-validator';
import config from '../config/config';
import { IsNull } from 'sequelize-typescript';

class AuthController {
    static login = async (req: Request, res: Response) =>{
        console.log('bbb');
        let {login, password} = req.body;
        if(!(login && password)){
            res.status(400).send();
        }
        let user;
        try{
            user = await User.findOne({where:{login:login}})
        }
        catch(error ){
            res.status(401).send();
            return;
        }
        if(user!==null){
            if(!user.checkIfUnencryptedPasswordIsValid(password)){
                res.status(401).send();
                return;
            }
            const token = jwt.sign({
                userId: user.id, login: user.login
            },
            config.jwtSecret,
            {expiresIn: '30 minutes'});
            res.send(token);
        }

    };
        static changePassword = async (req: Request, res: Response)=>{
            const id = res.locals.jwtPayload.userId;
            const{oldPassword, newPassword} = req.body;
            if(!(oldPassword && newPassword)){
                res.status(400).send();
            }
            let user: User;
            try{
                user = await User.findOne(id);
            }
            catch(id){
                res.status(401).send();
                return;
            }
            user.password = newPassword;
            const errors = await validate(user);
            if(errors.length > 0){
                res.status(400).send(errors);
                return;
            }
            user.hasPassword();
            User.update(user,{where:{id}});
            res.status(204).send();            
        }
}
export default AuthController;
