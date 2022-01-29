# Inventure 面试：流式读取/写入Excel文件

## 如何运行

```
$ npm i
$ npm start
```
便会在`./output`文件夹下生成一个新的`excel.xlsx`文件。

## 思路

- Excel文件的解析和输出使用了第三方库[`exceljs`](https://www.npmjs.com/package/exceljs)。
- JavaScript是一门单线程语言，需要使用`Worker`来实现题目中多线程的要求。
    - 分别为`workbookReader`和`workbookWriter`建立单独文件与`Worker`线程。
    - `workbookReader.js`: `exceljs`使用异步生成器流式读取不同的工作表与行。
    - `workbookWriter.js`: 每读取一行就同时写入到新的`WorkbookWriter`实例中。

## 改进

- 广播机制可以使用`MessageChannel`或者`BroadcaseChannel`。
- 实现多种格式类型的同时写入，比如`.json`、`.csv`等。
- 可以在浏览器中工作，可能需要编写一版简单的`xlsx parser`。