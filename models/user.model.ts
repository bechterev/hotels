
import {Optional} from "sequelize"
import {AllowNull, AutoIncrement, Column, NotEmpty, PrimaryKey, Table, Model} from "sequelize-typescript";
import * as bcrypt from 'bcryptjs';

export interface IUser{
    id: number
    login: string
    email: string
    password: string
    role: string
}
export interface IUserCreationAttributes extends Optional<IUser, 'id'>{}

@Table({
    createdAt:false,
    updatedAt: false
})
export  class User extends Model<IUser, IUserCreationAttributes>{
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number ;
    @AllowNull(false)
    @NotEmpty
    @Column
    login!: string;
    @AllowNull(false)
    @NotEmpty
    @Column
    email!: string;
    @AllowNull(false)
    @NotEmpty
    @Column
    password!: string;
    @NotEmpty
    @Column
    role!: string;
    hasPassword(){
        bcrypt
        this.password = bcrypt.hashSync(this.password, 8);
    }
    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string){
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}