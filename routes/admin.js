
import express from 'express';
import { selectSql, insertSql, updateSql, deleteSql } from '../database/sql.js';


const router = express.Router();

router.get('/', async (req, res) => {
    
    if (req.session.user == undefined) {
        res.redirect('/');
    } else {

        if (req.session.user.role === 'admin') {
     
            const doctors = await selectSql.getDoctor();
            const nurses = await selectSql.getNurse();

            res.render('admin', { 
                title: "Employee Information",
                doctors,
                nurses
            });
        } else {

            res.redirect('/');
        }
    }
});





router.post('/delete-doctor/:doctorId', async (req, res) => {
    const doctorId = req.params.doctorId;
    try {
      await deleteSql.deleteDoctor(doctorId);
      res.redirect('/admin');
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });
  
  router.post('/delete-nurse/:nurseId', async (req, res) => {
    const nurseId = req.params.nurseId;
    try {
      await deleteSql. deleteNurse(nurseId);
      res.redirect('/admin');
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });

//INSERTTTTTTTTTTTT
router.post('/:role', async (req, res) => {
    if(req.params.role == "doctor"){
        try {
            const vars = req.body   
            const data={
                doctor_id: vars.doctor_id,
                name: vars.name,
                address:vars.address,
                phone_number: vars.phone_number,
                password: vars.password,
                Medicalspeciality_department_id:vars.department_id
            }
            
            await insertSql.addDoctor(data);
            res.redirect('/admin'); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error'); 
        }
    }else if(req.params.role == "nurse"){
        try {
            const vars = req.body   
            const data={
                nurse_id: vars.nurse_id,
                name: vars.name,
                address:vars.address,
                phone_number: vars.phone_number,
                password: vars.password,
                Medicalspeciality_department_id:vars.department_id
            }
            await insertSql.addNurse(data);
            res.redirect('/admin'); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error'); 
        }
    }
    
});



///Updateeeeeeeee

router.post('/modify-doctor/:doctorId', async (req, res) => {
  const doctorId = req.params.doctorId;
  const { name, address, phone, password, id } = req.body;
  try {
    await updateSql.updateDoctor({
      id: doctorId,
      name,
      address,
      phone,
      password,
      dep_id: id
    });
    res.redirect('/admin');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

router.post('/modify-nurse/:nurseId', async (req, res) => {
  const nurseId = req.params.nurseId;
  const { name, address, phone, password, id } = req.body;
  try {
    await updateSql.updateNurse({
      id: nurseId,
      name,
      address,
      phone,
      password,
      dep_id: id
    });
    res.redirect('/admin');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});







export default router;
