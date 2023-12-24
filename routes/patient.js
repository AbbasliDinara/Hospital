import express from 'express';
import { selectSql,deleteSql,insertSql} from '../database/sql.js';

const router = express.Router();

router.get('/', async (req, res) => {
    
    if (req.session.user == undefined) {
        res.redirect('/');
    } else {
        if (req.session.user.role === 'patient') {
            
            const reservations = await selectSql.getReservation();
 
            res.render('patient', { 
                title: "Reservation Information",
                reservations
            });
        } else {
            
            res.redirect('/');
        }
    }
});

router.post('/delete-reservation/:reservationId', async (req, res) => {
    const reservationId = req.params.reservationId;
    try {
      await deleteSql.deleteReservation(reservationId);
      res.redirect('/patient');
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });


  router.post('/:role', async (req, res) => {
    if(req.params.role == "reservation"){
        try {
           const vars = req.body
           const parsedReservationNumber = parseInt(vars.reservation_number);
           const parsedPatientId = parseInt(vars.Patient_patient_id);
            const parsedDepartmentId = parseInt(vars.Medicalspeciality_department_id);
            const data={
               
                reservation_number: vars.parsedReservationNumber,
                Patient_patient_id:vars.parsedPatientId,
                Medicalspeciality_department_id:vars.parsedDepartmentId,
                reservation_date_time: vars.reservation_date_time,
            }
            
            await insertSql.addReservation(data);
            res.redirect('/patient'); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error'); 
        }
    }
});

export default router;