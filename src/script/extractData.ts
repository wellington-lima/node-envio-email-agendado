import { dbConfig } from '../database/config_mssql';
import dotenv from "dotenv";
import sql from 'mssql';
import { exportToExcel } from './exportExcel';
import { sendMail } from '../mail/sendMail';

dotenv.config();

export const extractExecute = async() => {
  const users = await runExtractUsers();
  const answers = await runExtractAnswers();

  let data = [];

  data.push(users);
  data.push(answers);

  await exportToExcel(data);

  sendMail();
  
}

const runExtractUsers = async()  => {
    
    try {
        const pool = await sql.connect(dbConfig);
        const procUsers = 'procedure_usuarios'; //nome da proceudure a ser executada
        const workSheetName = "Usuarios"; //nome da guia no arquivo xlsx
        const filePath = process.env.FILE_OUTPUT;

        const users = await pool.request().execute(procUsers);
        
        const workSheetColumnNames = [
          "idUser",
          "name",
          "email",
        ];
         
        const data = users.recordset.map((user: any) => {
          return [
            user.IdUsuario,
            user.name,
            user.email
          ];
        });
      
        return { data, workSheetColumnNames, workSheetName, filePath };
        
      } catch (error) {
        console.log(error);
      }
}

const runExtractAnswers = async()  => {
    
  try {
      const pool = await sql.connect(dbConfig);
      const procResults = 'procedure_respostas';
      const workSheetName = "Respostas";
      const filePath = process.env.FILE_OUTPUT;

      const results = await pool.request().execute(procResults);
      
      const workSheetColumnNames = [
        "IdUsuario",
        "pergunta1",
        "pergunta2",
        "pergunta3"
      ];
       
      const data = results.recordset.map((result: any) => {
        return [
          result.IdUsuario,
          result.pergunta1,
          result.pergunta2,
          result.pergunta3
        ];
      });
    
      return { data, workSheetColumnNames, workSheetName, filePath };
      
    } catch (error) {
      console.log(error);
    }
}