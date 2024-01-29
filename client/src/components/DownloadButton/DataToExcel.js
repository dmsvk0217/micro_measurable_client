// DataToExcel.js
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export const exportToCSV = (apiData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    // apiData를 워크시트로 변환
    const ws = XLSX.utils.json_to_sheet(apiData);
    
    // 워크북 생성 및 워크시트 추가
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    
    // 워크북에서 바이너리 버퍼 생성
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    
    // Blob 객체 생성
    const data = new Blob([excelBuffer], {type: fileType});
    
    // 파일 저장
    FileSaver.saveAs(data, fileName + fileExtension);
}
