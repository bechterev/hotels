
import { AutoIncrement, Column, NotNull, PrimaryKey, Table, Model, AllowNull, ForeignKey, BelongsTo, HasMany } from "sequelize-typescript";
import { Hotel } from "./hotel.model";
import { Reservation } from "./reservation.model";

export interface IRoom{
    id: number
    value_number: number
    count_number: number
}

@Table({
    timestamps: false
})
export  class Room extends Model implements IRoom{
    
    @AllowNull
    @Column
    count_number!: number;
    
    @AutoIncrement
    @PrimaryKey
    @Column
    id!: number;
    @AllowNull
    @Column
    value_number!: number;
    @ForeignKey(()=>Hotel)
    @Column
    hotelId!: number;
    @BelongsTo(() => Hotel)
    hotel!: Hotel
    @HasMany(()=>Reservation)
    reserv!: Reservation[];
}