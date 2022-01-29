const { WorkbookReader, WorkbookWriter } = require('exceljs').stream.xlsx;

const inputPath = './assets/1504_人口、人口密度统计年鉴_20191113.xlsx';
const outputPath = './output/excel.xlsx';
const workbookReader = new WorkbookReader(inputPath);
const workbookWriter = new WorkbookWriter({ filename: outputPath });

(async () => {
    for await (const worksheetReader of workbookReader) {
        const worksheetWriter = workbookWriter.addWorksheet();
        for await (const row of worksheetReader) {
            worksheetWriter.addRow(row.values).commit();
        }
        worksheetWriter.commit();
    }
    await workbookWriter.commit();
})();