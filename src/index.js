import express from 'express';
import logger from 'morgan';
import path from 'path';
import expressSession from "express-session";
import { fileURLToPath } from 'url';

import loginRouter from '../routes/login.js';
import adminRouter from '../routes/admin.js';
import employeeRouter from '../routes/employee.js';
import patientRouter from '../routes/patient.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

const app = express();


app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressSession({
    secret: "my key",
    resave: true,
    saveUninitialized: true,
}));

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));

app.use('/', loginRouter);
app.use('/admin', adminRouter);
app.use('/employee', employeeRouter);
app.use('/patient', patientRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
