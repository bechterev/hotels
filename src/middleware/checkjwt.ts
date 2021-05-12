import { Request, Response, NextFunction } from 'express';
import { contentSecurityPolicy } from 'helmet';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try{
        jwtPayload = <any>jwt.verify(token, config.jwtSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (error){
        res.status(401).send();
        return;
    }

const {userId, login} = jwtPayload;
const newToken = jwt.sign({userId, login}, config.jwtSecret,{expiresIn: '30 minutes'});
res.setHeader('token', newToken);
next();
}
