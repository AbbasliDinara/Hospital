
import express from "express";
import { selectSql } from "../database/sql.js"; 



const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { id, password } = req.body;

    try {
        const users = await selectSql.getUser();
        const user = users.find(user => user.Id === id && user.Password === password);

        if (user) {
            console.log('login success!');
            req.session.user = { id: user.Id, role: user.Role, checkLogin: true };
            
     
            if (user.Role === 'admin') {
                res.redirect('/admin');
            } else if (user.Role === 'doctor' || user.Role === 'nurse') {
                res.redirect('/employee');
            } else if (user.Role === 'patient') {
                res.redirect('/patient');
            }
        } else {
            console.log('login failed!');
            res.send(`<script>
                        alert('login failed!');
                        location.href='/';
                      </script>`);
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Internal Server Error');
    }
});
export default router; 
