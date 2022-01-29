# Inventure 面试：流式读取/写入Excel文件

## 如何运行

```
$ npm i
$ npm start
```
便会在`./output`文件夹下生成一个新的`excel.xlsx`文件。

## 思路

- Excel文件的解析和输出使用了第三方库[`exceljs`](https://www.npmjs.com/package/exceljs)。
- JavaScript是一门单线程语言，因此使用异步来实现同时读取和写入。
    - `exceljs`使用异步生成器流式读取不同的工作表与行。
    - 每读取一行就同时写入到新的`WorkbookWriter`实例中。