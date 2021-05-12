import { Request, Response, NextFunction} from 'express';
import {User} from '../../models/user.model';

export const checkRole = (roles: Array<string>) =>{
    return async (req: Request, res: Response, next: NextFunction) =>{
        const id = res.locals.jwtPayload.userId;
        let user: User | null = null;
        try{
            user = await User.findOne(id);
        }
        catch(e){
            res.status(401).send();
        }
        if(user!==null){
            if(roles.indexOf(user.role) > -1) next();
        else res.status(401).send();
        }
        
     }
}