;!function () {
    let datasid = location.search.substring(1).split('=')[1];
    const spic = $('#spic');
    const bpic = $('#bpic');
    const sf = $('#sf');
    const bf = $('#bf');
    if (!datasid) { //如果sid不存在，设置1
        datasid = 1;
    }
    $.ajax({
        url: 'http://localhost/JS2007/php/getsid.php',
        data: {
            sid: datasid
        },
        dataType: 'json'
    }).done((data) => {
        let objdata = data;
        $('#smallpic').attr('src', objdata.url); //图片地址
        $('.loadtitle').html(objdata.title); //标题
        $('.loadpcp').html(objdata.price);
        $('#bpic').attr('src', objdata.url);
        let arr = objdata.piclisturl.split(','); //转数组
        let strhtml = '';
        $.each(arr, function (index, value) {
            strhtml += `
                <li><img src="${value}"/></li>
            `;
        });

        $('#list1 ul').html(strhtml);
    });
    spic.hover(function () { //显示小放和大放
        sf.css({
            visibility: 'visible'
        });
        bf.css({
            visibility: 'visible'
        });
        //计算放大镜的尺寸。
        sf.css({
            width: spic.outerWidth() * bf.outerWidth() / bpic.outerWidth(),
            height: spic.outerHeight() * bf.outerHeight() / bpic.outerHeight()
        });
        //计算比例
        let bili = bpic.outerWidth() / spic.outerWidth();
        //小图内容鼠标移动
        spic.on('mousemove', function (e) {
            let left = e.pageX - $('.wrap').offset().left - sf.width() / 2;
            let top = e.pageY - $('.wrap').offset().top - sf.height() / 2;
            if (left <= 0) {
                left = 0;
            } else if (left >= spic.width() - sf.width()) {
                left = spic.width() - sf.width();
            }

            if (top <= 0) {
                top = 0;
            } else if (top >= spic.height() - sf.height()) {
                top = spic.height() - sf.height();
            }

            sf.css({
                left: left,
                top: top
            });
            bpic.css({
                left: -bili * left,
                top: -bili * top
            });
        });
    }, function () {
        sf.css({
            visibility: 'hidden'
        });
        bf.css({
            visibility: 'hidden'    
        });
    })

    // console.log($('#list ul li').size());//0
    // 采用事件委托，进行放大镜的图片切换
    // 通过当前的li找到li内部的图片的地址，赋值给小图和大图
    $('#list1 ul').on('mousemove', 'li', function () {
        $(this).addClass('active').siblings('li').removeClass('active');
        let picurl = $(this).find('img').attr('src');
        spic.find('img').attr('src', picurl);
        bpic.attr('src', picurl);
    }),
    // $('#list1 ul').on('mouseout', 'li', function () {
    //     $(this).removeClass('active').siblings('li').removeClass('active');
    // }),
    $('#list1 ul').on('click', 'li', function () {
        // console.log($(this).find('img').attr('src'));//图片的地址
        let picurl = $(this).find('img').attr('src');
        spic.find('img').attr('src', picurl);
        bpic.attr('src', picurl);
    });
    
    let arrsid = []; //存储商品sid的数组。
    let arrnum = []; //存储商品数量的数组。
    //当前的商品是第一次购买，还是多次购买，第一次购买创建商品列表，多次购买只需要增加数量。
    //疑问：如何确认当前是第一次还是多次。
    //解答：通过获取cookie来确认，如果是第一次cookie里面肯定不存在当前的sid，否则cookie里面一定存在当前的sid.
    //提前约定存储cookie的sid和数量的key值。
    function getcookie() {
        if (cookie.get('cookiesid') && cookie.get('cookienum')) {
            arrsid = cookie.get('cookiesid').split(','); //取出cookie将值转换成数组。
            arrnum = cookie.get('cookienum').split(','); //取出cookie将值转换成数组。
        }
    }

    $('.p-btn a').on('click', function() {
        getcookie();
        //$.inArray(value,array)确定第一个参数在数组中的位置，从0开始计数(如果没有找到则返回 -1 )。
        //val():读写表单的值。
        if ($.inArray(datasid, arrsid) === -1) { //不存在,添加sid和数量
            //添加sid
            arrsid.push(datasid);
            //将整个sid的数组存入cookie
            cookie.set('cookiesid', arrsid, 10);
            //添加数量
            arrnum.push($('#count').val());
            //将整个数量的数组存入cookie
            cookie.set('cookienum', arrnum, 10)
        } else { //存在，添加数量
            //根据当前的sid找到商品的数量，用当前新加的数量+cookie里面存在的数量。
            let sidindex = $.inArray(datasid, arrsid);
            let newarrnum = parseInt(arrnum[sidindex]) + parseInt($('#count').val()); //cookie里面存在的数量 + 当前新加的数量
            arrnum[sidindex] = newarrnum;
            //将整个数量的数组存入cookie
            cookie.set('cookienum', arrnum, 10);
        }
    });
}(jQuery);