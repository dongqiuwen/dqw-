!function () {
    const $navshop = $('.nav-shop');
    const $navlist = $('.nav-list');
    const $cartlist = $('.cartlist');
    $navshop.on('mouseover', function () {
        $navlist.css('display', 'block')
    })
    $navshop.on('mouseout', function () {
        $navlist.css('display', 'none')
    })
    $navlist.hover(() => {
        $navlist.show();
    }), () => {
        $navlist.hide();
    }
    $cartlist.hover(() => {
        $cartlist.show();
    }, () => {
        $cartlist.hide();
    })
}(jQuery);
; !function () {
    if (cookie.get('cookiesid') && cookie.get('cookienum')) {
        let sidarr = cookie.get('cookiesid').split(',');
        let numarr = cookie.get('cookienum').split(',');
        console.log(sidarr); //["1", "5", "9", "6"]
        console.log(numarr); //["10", "55", "100", "60"]
        for (let i = 0; i < sidarr.length; i++) {
            renderlist(sidarr[i], numarr[i]);
        }
    }

    //2.单独封装函数实现商品列表的渲染。
    //渲染的方式：提前隐藏一个结构，对隐藏的结构进行赋值。
    function renderlist(sid, num) { //sid:商品的sid  num:商品数量。
        $.ajax({
            url: 'http://localhost/JS2007/php/jingdong.php',
            dataType: 'json'
        }).done(function (data) {
            console.log(data);
            $.each(data, function (index, value) {
                if (value.sid === sid) { //如果传入的sid和当前接口数据中的sid相等，能够拿到当前的这条数据。
                    //clone([Even[,deepEven]])克隆匹配的DOM元素并且选中这些克隆的副本。
                    //第一个参数true:克隆上面的事件
                    //第二个参数true:包括事件和子元素。 
                    // console.log(value.title);
                    let clonebox = $('.cart:hidden').clone(true, true); //对隐藏的元素进行克隆
                    clonebox.find('img').attr('src', value.url);
                    clonebox.find('a').html(value.title);
                    clonebox.find('.price').html(value.price);
                    clonebox.find('#num').html(num);
                    clonebox.find('.sum').html((value.price * num).toFixed(2));
                    //append(content|fn)向每个匹配的元素内部追加内容。
                    //显示克隆的元素。
                    clonebox.css('display', 'block');
                    $('.left').append(clonebox);
                    calc(); //计算总价
                }
            });
        })
    }

    //3.计算总价
    function calc() {
        let allprice = 0; //商品的总价
        let allcount = 0; //商品总的件数
        $('.cart:visible').each(function (index, element) {
            //is():根据选择器、DOM元素或 jQuery 对象来检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true。
            if ($(this).find('select option').is(':checked')) {
                allprice += parseFloat($(this).find('.b-sum strong').html());
                allcount += parseInt($(this).find('.quantity-form input').val());
            }
        });
        $('.amount-sum em').html(allcount);
        $('.totalprice').html('￥' + allprice.toFixed(2));
    }

    $(function () {
        $(".cart .delete").bind("click", function () {
            $(this).parent().empty();
        });
    });
}(jQuery);