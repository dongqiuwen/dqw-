!function(){
    let datasid = location.search.substring(1).split('=')[1]; 
    const spic = $('#spic'); 
    const bpic = $('#bpic');
    const sf = $('#sf'); 
    const bf = $('#bf'); 
    if (!datasid) { //如果sid不存在，设置1
        datasid = 1;
    }
    $.ajax({
        url:'http://localhost/JS2007/php/getsid.php',
        data:{
            sid:datasid
        },
        dataType:'json'
    }).done((data) => {
        let objdata=data;
        $('#smallpic').attr('src', objdata.url); //图片地址
        $('.loadtitle').html(objdata.title); //标题
        $('.loadpcp').html(objdata.price);
        $('#bpic').attr('src', objdata.url);
        let arr = objdata.piclisturl.split(','); //转数组
        let strhtml = '';
        $.each(arr, function(index, value) {
            strhtml += `
                <li><img src="${value}"/></li>
            `;
        });
        
        $('#list1 ul').html(strhtml);
    })
}(jQuery)