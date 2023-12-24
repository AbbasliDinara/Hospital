import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();



const pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '100Dream100.',
    database: 'dinara1717',
});


const promisePool = pool.promise();



export const selectSql = {
    getUser: async () => {
        const sql = `SELECT * FROM user`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getDoctor: async () => {
        const sql = `SELECT * FROM doctor`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getNurse: async () => {
        const sql = `SELECT * FROM nurse`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getExamination: async () => {
        const sql = `SELECT * FROM examination`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getOneExamination: async (id) => {
        const sql = `SELECT * FROM examination where Doctor_doctor_id=${id}`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getTreatment: async () => {
        const sql = `SELECT * FROM treatment`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getReservation: async () => {
        const sql = `SELECT * FROM reservation `;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getSearch: async (searchTerm) => {
        let sql = `SELECT * FROM examination`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getOnePatient: async (name) => {
        let sql = `SELECT * FROM patient where name="${name}"`;
        const [result] = await promisePool.query(sql);
        return result;
    },
    getOneTreatment: async (id) => {
        let sql = `SELECT * FROM nurse where name="${id}"`;
        const [result] = await promisePool.query(sql);
        return result;
    },

    
}






export const deleteSql = {

    deleteDoctor: async (doctorId) => {
        const sql = `DELETE FROM doctor WHERE doctor_id = ${doctorId}`;;
        await promisePool.query(sql)
    },
    
    deleteNurse: async (nurseId) => {
        const sql = `DELETE FROM nurse WHERE nurse_id = ${nurseId}`;
        await promisePool.query(sql)
    },

    deleteExamination: async (examinationId) => {
        const sql = `DELETE FROM examination WHERE Doctor_doctor_id = ${examinationId}`;
        await promisePool.query(sql)
    },

    deleteTreatment: async (treatmentId) => {
        const sql = `DELETE FROM treatment WHERE Nurse_nurse_id = ${treatmentId}`;
        await promisePool.query(sql)
    },
    deleteReservation: async (reservationId) => {
        const sql = `DELETE FROM reservation WHERE reservation_number = ${reservationId}`;
        await promisePool.query(sql)
    }

};


export const insertSql = {

    addDoctor: async (data) =>{
        const sql= `insert into doctor values(
            "${data.doctor_id}","${data.name}","${data.address}","${data.phone_number}","${data.password}","${data.Medicalspeciality_department_id}"
        )`
        await promisePool.query(sql)
    },
    addNurse: async (data) =>{
        const sql= `insert into nurse values(
            "${data.nurse_id}","${data.name}","${data.address}","${data.phone_number}","${data.password}","${data.Medicalspeciality_department_id}"
        )`
        await promisePool.query(sql)
    },
    addExamination: async (data) =>{
        const sql= `insert into examination values(
            "${data.Doctor_doctor_id}","${data.Patient_patient_id}","${data.examination_date_time}","${data.examination_details}"
        )`
        await promisePool.query(sql)
    },

    addTreatment: async (data) =>{
        const sql= `insert into treatment values(
            "${data.Nurse_nurse_id}","${data.Patient_patient_id}","${data.treatment_date_time}","${data.treatment_details}"
        )`
        await promisePool.query(sql)
    },
    addReservation: async (data) =>{
        const sql= `insert into reservation (reservation_number, Patient_patient_id, Medicalspeciality_department_id, reservation_date_time) 
                    values("${data.reservation_number}", "${data.Patient_patient_id}", "${data.Medicalspeciality_department_id}", "${data.reservation_date_time}")`;
        await promisePool.query(sql);
    }
    

    
}

export const updateSql = {
    updateDoctor: async (data) =>{
    const sql = `
      UPDATE doctor 
      SET name = "${data.name}", 
          address = "${data.address}",
          phone_number= "${data.phone}",
          password = "${data.password}",
          Medicalspeciality_department_id = "${data.dep_id}"
      WHERE doctor_id = ${data.id}`;
    await promisePool.query(sql)
  },
  updateNurse: async (data) =>{
    const sql = `
      UPDATE nurse 
      SET name = "${data.name}", 
          address= "${data.address}",
          phone_number = "${data.phone}",
          password = "${data.password}",
          Medicalspeciality_department_id = "${data.dep_id}"
      WHERE nurse_id = ${data.id}`;
      await promisePool.query(sql)
   
  },

  updateExamination: async (data) =>{
    const sql = `
    UPDATE examination 
    SET examination_date_time = "${data.examination_date_time}", 
        examination_details = "${data.examination_details}",
        Patient_patient_id =" ${data.patient_patient_id}"
    WHERE Doctor_doctor_id = ${data.id}`;
      await promisePool.query(sql)
   
  },
  updateTreatment: async (data) =>{
    const sql = `
    UPDATE treatment 
    SET treatment_date_time = "${data.treatment_date_time}", 
         treatment_details = "${data.treatment_details}",
        Patient_patient_id =" ${data.patient_patient_id}"
    WHERE Nurse_nurse_id = ${data.id}`;
      await promisePool.query(sql)
   
  },
 }







