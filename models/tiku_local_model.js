var mongoose = require('mongoose');

var tiku_local_Schema = new mongoose.Schema({
//HTML中的属性为data-no，表示每一题的编号
  data_no: {
    type: Number,
    unique: true,
    index: true
  },
  //初中：xd=2;高中：xd=3
  xd: {
    type: Number,
    unique: true,
    index: true
  },
  //chid为对应阶段的科目,具体分类见笔记
  chid: {
    type: Number,
    unique: true,
    index: true
  },
  //question_channel_type为题型，需要根据xd与chid的不同而分不同题型，具体分类见笔记
  question_channel_type: {
    type: Number,
    unique: true,
    index: true
  },
  //difficult_index=1为容易；difficult_index=2为普通；difficult_index=3为困难
  difficult_index: {
    type: Number,
    unique: true,
    index: true
  },
  //需根据xd与chid的不同有不同的题类，具体分类见笔记
  exam_type: {
    type: Number,
    unique: true,
    index: true
  },
  //适用年级，具体分类见笔记
  grade_id: {
    type: String,
    unique: true,
    index: true
  }

}, {
  autoIndex: false
});

mongoose.model('tiku_locals', tiku_local_Schema, 'tiku_locals');