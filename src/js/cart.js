!function(){
    const $navshop=$('.nav-shop');
    const $navlist=$('.nav-list');
    const $cartlist=$('.cartlist');
    $navshop.on('mouseover',function(){
        $navlist.css('display','block')
    })
    $navshop.on('mouseout',function(){
        $navlist.css('display','none')
    })
    $navlist.hover(()=>{
        $navlist.show();
    }),()=>{
        $navlist.hide();
    }
    $cartlist.hover(() => {
        $cartlist.show();
    }, () => {
        $cartlist.hide();
    })
}(jQuery)