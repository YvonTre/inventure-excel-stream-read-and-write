const { parentPort } = require('worker_threads');
const { WorkbookReader } = require('exceljs').stream.xlsx;

parentPort.on('message', async (filePath) => {
    const workbookReader = new WorkbookReader(filePath);
    for await (const worksheetReader of workbookReader) {
        parentPort.postMessage({ type: 'sheet', value: worksheetReader.id });
        for await (const row of worksheetReader) {
            parentPort.postMessage({ type: 'row', value: row.values });
        }
    }
    // 读取完毕之后，主动退出线程。
    console.log('Xlsx read finished, ready to close.');
    process.exit();
});