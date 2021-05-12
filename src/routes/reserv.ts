import express from 'express';
import ReservationController from '../controllers/reserv.controller';

const router = express.Router();
router.get('/reservationall',ReservationController.getListReservation)
router.get('/hotelsall',ReservationController.getHotels)
router.get('/roomsall/:id',ReservationController.getRooms);
router.post('/statistic',ReservationController.getStatistic);
router.post('/freeroom',ReservationController.getFreeRoom);
router.post('/addreservation', ReservationController.addReservation)


export default router;