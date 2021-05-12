import { Request, Response } from 'express';
import * as jwt from "jsonwebtoken";
import { Reservation } from '../../models/reservation.model';
import { validate } from 'class-validator';
import config from '../config/config';
import { Op, Sequelize, fn, QueryTypes } from 'sequelize';
import { send } from 'process';
import moment from 'moment';
import { Hotel } from '../../models/hotel.model';
import { Room } from '../../models/room.model';


class ReservationController {
    static getListReservation = async (req: Request, res: Response) => {
        let reservations: Reservation[];
        reservations = await Reservation.findAll();
        console.log('yes')
        if (reservations)
            res.status(200).send(reservations);
        else res.status(400)
    }
    static getOneById = async (req: Request, res: Response) => {
        const date_start: number = +req.params.date_start;
        const date_stop: number = +req.params.date_stop;
        const hotel: string = req.params.hotel;
        try {
            const user = await Reservation.findOne({
                where: {
                    date_start: { [Op.gt]: date_start },
                    date_stop: { [Op.lt]: date_stop },
                    active: true
                }
            }).then(x => moment())
        }
        catch (error) {
            res.status(404).send('User not found');
        }
    };
    static addReservation = async (req: Request, res: Response) => {
        let reservation: any;
        console.log('req')
        reservation = req.body;
        console.log(reservation)
        let status = await Reservation.create({ start_date: reservation.data.date[0], stop_date: reservation.data.date[1], roomId: reservation.data.room, active: true, client: 1 })
    }
    static getHotels = async (req: Request, res: Response) => {
        let listHotels: Hotel[];
        listHotels = await Hotel.findAll();
        res.status(200).send(listHotels);
    }
    static getRooms = async (req: Request, res: Response) => {
        let listRooms: Room[];
        let hotelId = req.params.id;
        console.log(hotelId);
        listRooms = await Room.findAll({ where: { hotelId: hotelId } });
        res.status(200).send(listRooms);
    }
    static getFreeRoom = async (req: Request, res: Response) => {
        let listRooms: Room[];
        let { hotelId, date } = req.body;
        console.log(date)
        listRooms = await Room.findAll({
            where:
                { hotelId: hotelId.id },
            attributes: ['id', 'value_number', 'count_number'],
            include: {
                model: Reservation,
                where:
                {
                    [Op.or]: [{
                        start_date: {
                            [Op.lte]: date.start_date.toString()
                        },
                        stop_date: { [Op.gte]: date.stop_date.toString() },
                        active: false
                    },
                    {
                        start_date: null,
                        stop_date: null,
                        active: null
                    }
                    ]

                },

                required: false
            }
        })
        res.status(200).send(listRooms);
    }
    static getStatistic = async (req: Request, res: Response) => {
        let data = req.body;
        let reservations: any;
     
        reservations = await Reservation.sequelize?.query(`select sum(date_part) as days,mon,value_number,name as hotel from 
                                                            (select date_part('day', r.stop_date - r.start_date),
                                                            to_char(r.start_date,'month') as mon,
                                                            rs.value_number,h."name" from  "Reservations" r 
                                                            join "Rooms" rs on rs.id = r."roomId" 
                                                            join "Hotels" h  on rs."hotelId" =h.id 
                                                            where r.start_date>=$1 and r.stop_date<=$2 ) as t
                                                            group by t.mon, t.value_number, t.name`,{
                                                               bind:[data.start_date,data.stop_date],
                                                               type:QueryTypes.SELECT
                                                           })
        
        res.status(200).send(reservations)

    }
}
export default ReservationController;