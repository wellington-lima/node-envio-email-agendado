import express from 'express';
import dotenv from 'dotenv';
import schedule from 'node-schedule';
import { extractExecute } from './script/extractData';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.listen(port, ()=> {
    console.log(`App bot stract started on host ${process.env.HOST_URL}`);
    schedule.scheduleJob('00 00 08 * * 1', () => { extractExecute() }); //Agendado para enviar o email toda segunda-feira as 08hs am
});
