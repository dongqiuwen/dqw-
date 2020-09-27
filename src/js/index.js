!function(){
    const $div=$('.div');   
    const $img=$('.div img')
    const $price=$('.div .price');
    const $title=$('.div h4');
    const $div1=$('.div1');
    const $img1=$('.div1 img');
    const $price1=$('.det .price');
    const $A=$('.div a');
    $.ajax({
        url:'http://localhost/JS2007/php/jingdong.php',
        dataType:'json'
    })
    .done((data)=>{
       let $datalist=data;
       console.log($datalist);
       for(i=0;i<$div.length;i++){
           $img[i].src=$datalist[i].url;
           $price[i].innerHTML='￥'+$datalist[i].price;
           $title[i].innerHTML=$datalist[i].title;
        }
    for(i=0;i<$div1.length;i++){
        $img1[i].src=$datalist[i+4].url;
        $price1[i].innerHTML='￥'+$datalist[i+4].price;
    }
    })
}(jQuery);
;!function(){
    const $shadow = $('.shadow');
    const $shadowbox=$('.shadowbox');
    const $btns=$('.div1 .btn');
    const $close=$('.shadowbox span')
    const $div1=$('.div1');
    const $shadowpic=$('.shadowbox img')
    $btns.on('click',function(){
        $shadow.css('display','block');
        $shadowbox.css('display','block');
        $.ajax({
        url:'http://localhost/JS2007/php/jingdong.php',
        dataType:'json'
        }).done((data)=>{
        let $datalist=data;
    })
    })
    $close.on('click',function(){
        $shadowbox.css('display','none');
        $shadow.css('display','none');
    })
    
}(jQuery);

;!function(){
    const $menuli =$('.nav-list li');
    const $item=$('.item');
    const $cartlist=$('.cartlist');
    $menuli.on('mouseover',function(){
        $(this).addClass('weight').siblings('li').removeClass('weight');
        $item.eq($(this).index()).show().siblings('.item').hide();
        $cartlist.show();
    })
    $menuli.on('mouseout',function(){
        $cartlist.hide();
    })
    $cartlist.hover(() => {
        $cartlist.show();
    }, () => {
        $cartlist.hide();
        $menuli.removeClass('weight');
    })
}(jQuery);

;!function(){
    const $ban=$('.banner');
    const $btn=$('.banner div');
    const $img=$('.banner img');
    const $leftA=$(".icon-iconfontjiantou1");
    const $rightA=$(".icon-youjiantou");
    let $index=0;
    $btn.eq($index).addClass('active');
    $ban.on('mouseover',function(){
        $btn.css('bottom','0px');
    });
    $ban.on('mouseout',function(){
        $btn.css('bottom','-47px');
    });
    $btn.on('mouseover',function(){
        $img.eq($(this).index()).show().siblings('img').hide();
        $btn.eq($(this).index()).addClass('active').siblings('div').removeClass('active');
    })
    let rightc=function(){
        $index+=1;
        if($index>1){
            $index=0;
        }
        $img.eq($index).show().siblings('img').hide();
        $btn.eq($index).addClass('active').siblings('div').removeClass('active');
    }
    let leftc=function(){
        $index-=1;
        if($index<0){
            $index=1;
        }
        $img.eq($index).show().siblings('img').hide();
        $btn.eq($index).addClass('active').siblings('div').removeClass('active');
    }
    $rightA.on('click',function(){
        rightc();
    })
    $leftA.on('click',function(){
        leftc();
    })
    setInterval(()=>{
        rightc();
    },4000);
}(jQuery)