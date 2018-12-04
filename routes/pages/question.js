//var read_tiku_by_req = require('./read_tiku_by_req.js');
var all_path = require('./all_path.js');
var fs = require('fs');
var url = require('url');

var cheerio = require('cheerio'); //类似于jquery的dom操作的模块


exports.question_ajax = function (req, res, next) {
  //req.connection.setTimeout(100000); //100 seconds


  let parseObj = url.parse(req.url, true);
  req.query = parseObj.query;
  console.log(req.query);
  //console.log(req.query.knowledges);
  console.log(req.query.QuestionsNo_every_page);

  //TODO:根据req.query来查找数据库中符合要求的题目编号，按time排序，选取前10个

  let QuestionsNo_every_page = req.query.QuestionsNo_every_page;//let QuestionsNo_every_page = req.body.QuestionsNo_every_page
  // 创建可读流

  let Questions_temp = ''

  // 创建可读流

  let readerStream = fs.createReadStream(all_path.public_path + 'ty_tiku/xd-2,chid-2/' + String(QuestionsNo_every_page) + '.txt'); // TODO: 此处路径需根据在数据库中查到的题目编号来设定

  // 设置编码为 utf8。
  readerStream.setEncoding('UTF8');

  // 处理流事件 --> data, end, and error
  readerStream.on('data', function (chunk) {
    Questions_temp += chunk;
  });

  readerStream.on('end', function () {
    if (req.body.islogin === true) {
      if (req.query.is_cart_detail === 'true') {

        let $ = cheerio.load(Questions_temp);
        $('.QuestionView').find(".q-handle").remove();
        $('.QuestionView').find(".q-msg").css("display", "none");
        $('.QuestionView').find(".q-msg span").eq(3).remove();
        $('.QuestionView').find(".q-msg").append("<div class='q-handle fl'><a class='q-add-btn J_add_remove'>移除题目</a></div>");
        $('.QuestionView').find(".q-origin").remove();
        console.log('remove success');
        res.json({
          type: true,
          data: $.html()
        });

      } else {
        res.json({
          type: true,
          data: Questions_temp
        });
      }

    } else if (req.body.islogin === false) {
      let $ = cheerio.load(Questions_temp);
      $('.QuestionView').find(".q-analyize").remove();
      res.json({
        type: true,
        data: $.html()
      });
    }
  });

  readerStream.on('error', function (err) {
    console.log(err.stack);
  });

  //console.log("读取题" + String(QuestionsNo_every_page)+"完毕");

}