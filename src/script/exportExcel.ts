import xlsx from 'xlsx';
import path from 'path';

export const exportToExcel = async (data: any[]) => {

  const workBook = xlsx.utils.book_new();
  
  data.map((obj: any) => {
    const workSheetData = [obj.workSheetColumnNames, ...obj.data];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, obj.workSheetName);
    xlsx.writeFile(workBook, path.resolve(obj.filePath));
  
  })
}