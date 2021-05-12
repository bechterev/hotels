import { Allow } from "class-validator";
import { AllowNull, AutoIncrement, Column, NotNull, PrimaryKey, Table, Model, HasMany } from "sequelize-typescript";
import { Association, HasManyAddAssociationMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyGetAssociationsMixin, HasManyHasAssociationMixin} from "sequelize/types";
import {Room} from "./room.model";

export interface IHotel{
    id: number
    name: string
    count_room: number
}

@Table({
    timestamps: false
})
export  class Hotel extends Model implements IHotel{
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;
    @AllowNull
    @Column
    name!: string;
    @AllowNull
    @Column
    count_room!: number;
    @HasMany(()=>Room)
    rooms!:Room[];
    }
