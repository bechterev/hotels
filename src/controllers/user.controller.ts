import { Request, Response} from 'express';
import {User} from '../../models/user.model';
import { validate } from 'class-validator';

class UserController{
    static listAll = async(req:Request, res: Response)=>{
        let users : User[];
        users = await User.findAll();
        res.send(users);
    };
    static getOneById = async(req:Request, res:Response)=>{
        const id: number = +req.params.id;
        try{
            const user = await User.findOne({where:{id:id}});
        }
        catch(error){
            res.status(404).send('User not found');
        }
    };
    static newUser = async (req:Request, res:Response)=>{
        let {login, password, role, email} = req.body;
        let user= new User();
        user.login = login;
        user.password = password;
        user.role = role;
        user.email = email;
        const errors = await validate(user);
        if(errors.length > 0){
            res.status(400).send(errors);
            return;
        }
        user.hasPassword();
        try{
            await User.create(user);
        }
        catch(err){
            res.status(409).send('login already in use');
        }
        res.status(201).send("user created");
    }
    static editUser = async(req:Request, res:Response)=>{
        const id = req.params.id;
        const {login, role} = req.body;
        let user;
        try{
            user = await User.findOne({where:{id:id}});
        }
        catch(error){
            res.status(404).send("User not found");
            return;
        }
        try{
            if(user!==null){
                await User.update(user,{where:{id:id}})
            }
            else{
                throw ReferenceError;
            }
        }
        catch(e){
            res.status(409).send("login already in use");
            return;
        }
        res.status(204).send();

    }
    static deleteUser = async (req: Request, res: Response) =>{
        const id = req.params.id;
        let user: User| null=null;
        try{
            
            user = await User.findOne({where:{id:id}})
            if(user === null)
                throw ReferenceError;
        }
        catch(error){
            res.status(404).send("User not found");
            return;
        }
        User.destroy({where:{id:id}});
        res.status(204).send();
    }

}
export default UserController;