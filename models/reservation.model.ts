import { AutoIncrement, Column, NotNull, PrimaryKey, Model, BelongsTo , Table, AllowNull, ForeignKey} from "sequelize-typescript";
import {Room} from "./room.model";
import {User} from "./user.model";

export interface IReservation{
    id: number
    start_date: Date
    stop_date: Date
    client: number
    roomId: number
    active: boolean
}
@Table({createdAt:false,
updatedAt:false})
export  class Reservation extends Model implements IReservation{
    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;
    
    @AllowNull
    @Column
    start_date!: Date;

    @AllowNull
    @Column
    stop_date!: Date;
    @ForeignKey(()=>User)
    @Column
    client!: number;
    @ForeignKey(()=>Room)
    @Column
    roomId!: number;
    @AllowNull
    @Column
    active!: boolean;
    @BelongsTo(() => User)
    user!: User
    @BelongsTo(()=>Room)
    room!:Room
}