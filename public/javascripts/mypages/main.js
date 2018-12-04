//从本地读取购物车信息,并修改购物车弹框内容,以便跨页访问。本地的存储信息来自于访问首页时,从数据库中读取并保持在本地。//FIXME:遗留的bug：这里面只有访问了主页的并登录的,才算用户登录。如果用户登录后直接不去主页,那么就不算登录。而且如果不去主页,那么购物车信息也没有从数据库中读取,那么购物车信息将是上次访问遗留的,此数据可以被修改,因此不太安全。
$(function () {
  let Cart_Modal_contents = localStorage.getItem("Cart_Modal_contents");
  let Cart_Modal_message = localStorage.getItem("Cart_Modal_message");

  //如果     (用户已经登录,也就是Cart_Modal_message为'undefined')    并且   (数据库中购物车信息为null 或者  购物车信息为undefined,也就是从来没有在数据库中建立购物车信息)
  if (((Cart_Modal_message == 'undefined') || (Cart_Modal_message == null)) && ((Cart_Modal_contents == 'undefined') || (Cart_Modal_contents == 'null') || (Cart_Modal_contents == null) || (Cart_Modal_contents == undefined))) {
    $('#Cart_Modal .modal-body>center').html('<p>您的购物车，空空如也！</p>');
    $('.rightside .divnum').text('' + 0);
  }

  //如果     (用户已经登录)   并且    (本地存储的购物车信息有数据)
  else if (((Cart_Modal_message == 'undefined') || (Cart_Modal_message == null)) && ((Cart_Modal_contents != 'undefined') && (Cart_Modal_contents != 'null') && (Cart_Modal_contents != null) && (Cart_Modal_contents != undefined))) {

    Cart_Modal_contents = JSON.parse(Cart_Modal_contents);
    let cart_num = 0;
    for (let key in Cart_Modal_contents) {
      if ((typeof (Cart_Modal_contents[key]) == "string") && ((Cart_Modal_contents[key]).indexOf('=') == -1)) {////FIXME:正则表达式不包含=
        cart_num = cart_num + parseInt(Cart_Modal_contents[key]);
        $('#Cart_Modal .modal-body>center').append('<p>' + key + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + Cart_Modal_contents[key] + '题' + '</p>');
      }
    }
    $('.rightside .divnum').text('' + cart_num);
  }

  //如果   用户没有登录
  else if ((Cart_Modal_message != null) && (Cart_Modal_message != 'undefined')) {
    $('#Cart_Modal .modal-body>center').html('<p>' + Cart_Modal_message + '</p>');
    $('.rightside .divnum').text('' + 0);
  }
})
