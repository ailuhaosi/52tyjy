//var o = new Foo(1,2);


/* function Foo() {
  //this.a = a;
  //this.b = b;  
  console.log('hello')
} */
var Foo= {
  n: function() {
    console.log('hello')
  }
};
//var bbb = new Foo();
var aaa = new Object();
//aaa.t='1'
var bar = Object.create(aaa);
bar.a = '3';
var o = Object.create(bar, {
  'a': {
    value: '1',
    enumerable: true
  },
  'b': {
    value: '2',
    enumerable: true
  }
});
//Foo.prototype.t = 't';//Function === 
// === Object.prototype.toString
var yyy = new Array(1)
console.log(aaa.toString === Object.prototype.toString)
console.log(yyy.toString)
//console.log(bbb.toString === Object.prototype.toString)
console.log(Object)
console.log(undefined)
