!function(){
    let $btn=$('.icon-youjiantou');
    let $help=$('.help .forget');
    let $help2=$('.help .another');
    let $index=0;
    $btn.on('click',function(){
        if($index==0){
            $help.show();
            $help2.show();
            $index+=1;
        }else{
                $help.hide();
                $help2.hide();
                $index=0;
        }
        
    })
}(jQuery);