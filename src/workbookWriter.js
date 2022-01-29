const { parentPort } = require('worker_threads');
const { WorkbookWriter } = require('exceljs').stream.xlsx;

let workbookWriter, worksheetWriter;
parentPort.on('message', (message) => {
    if (message === 'close') {
        // 完成文件写入，关闭写入Worker。
        workbookWriter.commit().then(() => process.exit());
    } else if (typeof message === 'string') {
        // 说明传入的是文件路径，建立新的Writer。这里其实也可以改为使用workerData接收路径数据。
        workbookWriter = new WorkbookWriter({ filename: message });
    } else if (workbookWriter) {
        const { type, value } = message;
        if (type === 'sheet') {
            // 如果已经存在worksheetWriter，保存工作表。
            worksheetWriter?.commit();
            // 建立新的工作表。
            worksheetWriter = workbookWriter.addWorksheet();
        } else if (type === 'row') {
            worksheetWriter.addRow(value).commit();
        }
    }
});