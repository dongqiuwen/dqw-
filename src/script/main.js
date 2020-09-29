//模块的配置
require.config({
    paths: { //路径
        'jquery': 'https://cdn.bootcdn.net/ajax/libs/jquery/1.12.4/jquery.min',
        'jcookie': 'https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.0/jquery.cookie.min',
        'jlazyload': 'https://cdn.bootcdn.net/ajax/libs/jquery.lazyload/1.8.3/jquery.lazyload.min'
    },
    shim: { //让不支持AMD的模块，支持AMD模块
        'jcookie': {
            deps: ['jquery'], //依赖的模块
            exports: 'jcookie' //别名
        },
        'jlazyload': {
            deps: ['jquery'],
            exports: 'jlazyload'
        }
    }
});

require(['jquery'], function() {
    let page = $('#currentpage').attr('page-origin'); //通过id名或者内部的自定义属性page-origin的值。
    if (page) {
        require([page], function(page) {
            page.init();
        });
    }
});