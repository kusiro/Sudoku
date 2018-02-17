$('document').ready(function(){
    $('.button').click(function(){
        var list = [];
        for(var i = 0; i < 9; i++){
            list.push([]);
            for(var j = 0; j < 9; j++){
                var selector = ".raw_" + i +  " .colum_" + j;
                list[i].push(document.querySelector(selector).value);
            }
        }
    })
})
