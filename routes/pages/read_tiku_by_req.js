var all_path = require('./all_path.js');
var fs = require('fs'); 



exports.my_readFile = function (req, res, next, read_Questions_li) {

  // 创建可读流
  var readerStream = fs.createReadStream(all_path.public_path + 'ty_tiku/xd-2,chid-2/page1.txt');// TODO: 未完成此处路径需根据req.url来设定

  // 设置编码为 utf8。
  readerStream.setEncoding('UTF8');

  // 处理流事件 --> data, end, and error
  readerStream.on('data', function (chunk) {
    read_Questions_li += chunk;
  });

  readerStream.on('end', function () {
    //console.log(read_Questions_li);
  });

  readerStream.on('error', function (err) {
    console.log(err.stack);
  });

  console.log("读取my_Questions_li完毕");
  return read_Questions_li
}