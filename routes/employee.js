import express from 'express';
import { selectSql,deleteSql,insertSql,updateSql } from '../database/sql.js';



const router = express.Router();

router.get('/', async (req, res) => {
    if (req.session.user == undefined) {
        res.redirect('/');
    } else {
        if (req.session.user.role === 'doctor') {
            const examinations = await selectSql.getExamination();
            res.render('examination', {
                title: "Examination Information",
                examinations
            });
        } else if (req.session.user.role === 'nurse') {
            const treatments = await selectSql.getTreatment();
            res.render('treatment', {
                title: "Treatment Information",
                treatments
            });
        } else {
            res.redirect('/');
        }
    }
});

//Searchhhhhhhhh
router.post('/examination', async (req, res) => {
  const vars = req.body;
  console.log(vars);
  const patient = await selectSql.getOnePatient(vars.name)
    const examinations = await selectSql.getOneExamination(req.session.user.id);
    res.render('examination',{
      title: "Examination",
      examinations,
      patient
    })
})
router.post('/treatment', async (req, res) => {
  const vars = req.body;
  console.log(vars);
  const patient = await selectSql.getOnePatient(vars.name)
    const treatments = await selectSql.getOneTreatment(req.session.user.id);
    res.render('treatment',{
      title: "Treatment",
      treatments,
      patient
    })
})



//Delete

router.post('/delete-examination/:examinationId', async (req, res) => {
    const examinationId = req.params.examinationId;
    try {
      await deleteSql.deleteExamination(examinationId);
      res.redirect('/employee');
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });
  
  router.post('/delete-treatment/:treatmentId', async (req, res) => {
    const treatmentId = req.params.treatmentId;
    try {
      await deleteSql. deleteTreatment(treatmentId);
      res.redirect('/employee');
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });

///Inserttttttttttttt


router.post('/:role', async (req, res) => {
    if(req.params.role == "examination"){
        try {
            const vars = req.body   
            const data={
                
                Doctor_doctor_id: vars.doctor_doctor_id,
                Patient_patient_id:vars.patient_patient_id,
                examination_date_time: vars.examination_date_time,
                examination_details: vars.examination_details,
            }
            
            await insertSql.addExamination(data);
            res.redirect('/employee'); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error'); 
        }
    }else if(req.params.role == "treatment"){
        try {
            const vars = req.body   
            const data={
                Nurse_nurse_id: vars.nurse_nurse_id,
                Patient_patient_id:vars.patient_patient_id,
                treatment_date_time: vars.treatment_date_time,
                treatment_details: vars.treatment_details,
            }
            await insertSql.addTreatment(data);
            res.redirect('/employee'); 
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error'); 
        }
    }
    
});

//Updatee
router.post('/modify-examination/:examinationId', async (req, res) => {
    const examinationId = req.params.examinationId; console.log(req.params, req.body); 
    const { id, patient_patient_id, examination_date_time, examination_details} = req.body;
    try {
      await updateSql.updateExamination({
          id: examinationId,
          patient_patient_id: patient_patient_id, 
          examination_date_time,
          examination_details
  
      });
      res.redirect('/employee');
    } catch (error) {
      res.status(500).send('Server Error');
    }
  });

router.post('/modify-treatment/:treatmentId', async (req, res) => {
  const treatmentId = req.params.treatmentId; console.log(req.params, req.body);
  const { id, patient_patient_id, treatment_date_time, treatment_details} = req.body;
  try {
    await updateSql.updateTreatment({
      id: treatmentId,
      patient_patient_id: patient_patient_id, 
      treatment_date_time,
      treatment_details
    });
    res.redirect('/employee');
  } catch (error) {
    res.status(500).send('Server Error');
  }
});


















export default router;