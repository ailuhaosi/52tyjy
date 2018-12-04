(function() {
  

  var my_ls = function (dataid) {
    this.dataid = dataid;
    return this;
  };
  my_ls.prototype = {
    add: function (dataval) {
      this.dataval = dataval || [];
      localStorage.setItem(this.dataid, JSON.stringify(this.dataval));
    },
    get: function () {
      return JSON.parse(localStorage.getItem(this.dataid));
    },
    remove: function () {
      localStorage.removeItem(this.dataid);
    },
    clear: function () {
      localStorage.clear();
    }
  };
  window.my_ls = my_ls;
})



//使用：
/* var data = [
  { "name": "a", "pwd": "123" },
  { "name": "b", "pwd": "aaa" }
]
var nmy_ls = new my_ls("abc");
my_ls.add(data);
var gn = nmy_ls.get();
//遍历数据输出
gn.forEach(function (v) {
  console.log(v.name);
}); */
/* nmy_ls.remove("abc");*/
