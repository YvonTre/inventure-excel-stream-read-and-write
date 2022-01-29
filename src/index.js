const { Worker } = require('worker_threads');

const inputPath = './assets/1504_人口、人口密度统计年鉴_20191113.xlsx';
const outputPath = './output/excel.xlsx';

// 建立读取和写入线程
const workbookReaderWorker = new Worker('./src/workbookReader.js');
const workbookWriterWorker = new Worker('./src/workbookWriter.js');

// 启动Excel读取和写入线程
workbookReaderWorker.postMessage(inputPath);
workbookWriterWorker.postMessage(outputPath);

// 读取线程每读取一条就发送至写入线程，实现边读取边写入
workbookReaderWorker.on('message', (message) => {
    workbookWriterWorker.postMessage(message);
});
// 读取完毕时通知写入线程完成写入
workbookReaderWorker.once('exit', () => {
    workbookWriterWorker.postMessage('close');
});