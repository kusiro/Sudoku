import Solver from './sudoku_solver.js';

var solver = new Solver;
var focusPoint = {};


$('document').ready(function(){
//---------------------上下左右--------------------

    $('input').focus(function(){
        focusPoint.raw = parseInt(this.dataset.raw, 10);
        focusPoint.colum = parseInt(this.dataset.colum, 10);
    })
    $('input').keydown(function(event){
        var keyPress = event.originalEvent.key;
        if(keyPress === "ArrowUp"){
            focusPoint.raw -= 1;
            if(focusPoint.raw < 0){
                focusPoint.raw = 8;
            }
        }else if(keyPress === "ArrowDown"){
            focusPoint.raw += 1;
            if(focusPoint.raw > 8){
                focusPoint.raw = 0;
            }
        }else if(keyPress === "ArrowLeft"){
            focusPoint.colum -= 1;
            if(focusPoint.colum < 0){
                focusPoint.colum = 8;
            }
        }else if(keyPress === "ArrowRight"){
            focusPoint.colum += 1;
            if(focusPoint.colum > 8){
                focusPoint.colum = 0;
            }
        }else{}
        $(".raw_" + focusPoint.raw + " .colum_" + focusPoint.colum).focus();
    })

//---------------------Let`s 按鈕--------------------

    $('.button').click(function(){
        for(var i = 0; i < 9; i++){
            for(var j = 0; j < 9; j++){
                var selector = ".raw_" + i + " .colum_" + j;
                var num = parseInt(document.querySelector(selector).value, 10);
                if( 1 <= num && num <= 9 ){
                    solver.set(i, j, num);
                }
            }
        }
        for(var i = 0; i < solver.next.length; i++){
            var alert_num = '.raw_' + solver.next[i].row + ' .colum_' + solver.next[i].col
            document.querySelector(alert_num).style.backgroundColor = "#EC8E26";
            document.querySelector(alert_num).dataset.val = solver.next[i].num;
            document.querySelector(alert_num).dataset.key = i;
        }
    })

//---------------------Display reason--------------------

    $('.colum').hover(function(){
        if(this.dataset.key !== "unset" && this.dataset.key !== "setted"){
            var reason_cause = solver.next[this.dataset.key].reason;
            for(var i = 0; i < reason_cause.length; i++){
                var reason_num = '.raw_' + reason_cause[i][0] + ' .colum_' + reason_cause[i][1];
                document.querySelector(reason_num).style.backgroundColor = "#009D9B";
                document.querySelector(reason_num).style.color = "#394145";
            }
        }
    });
    $('.colum').mouseleave(function(){
        if(this.dataset.key !== "unset" && this.dataset.key !== "setted"){
            var reason_cause = solver.next[this.dataset.key].reason;
            for(var i = 0; i < reason_cause.length; i++){
                var reason_num = document.querySelector('.raw_' + reason_cause[i][0] + ' .colum_' + reason_cause[i][1]);
                if(reason_num.dataset.val === "setted") {
                    reason_num.style.background = "rgb(255, 111, 111)";
                } else {
                    reason_num.style.background = "transparent";
                    reason_num.style.color = "#333";
                }
            }
        }
    });

//---------------------按下答案(黃色按鈕)--------------------

    $('.colum').click(function(){
        if(1 <= this.dataset.val && this.dataset.val <= 9){
            this.value = this.dataset.val;
            this.style.background = "rgb(255, 111, 111)";
            var reason_cause = solver.next[this.dataset.key].reason;

            for(var i = 0; i < reason_cause.length; i++){
                var reason_num = document.querySelector('.raw_' + reason_cause[i][0] + ' .colum_' + reason_cause[i][1]);
                if(reason_num.dataset.val === "setted") {
                    reason_num.style.background = "rgb(255, 111, 111)";
                } else {
                    reason_num.style.background = "transparent";
                    reason_num.style.color = "#333";
                }
            }

            solver.set(parseInt(this.dataset.raw, 10), parseInt(this.dataset.colum, 10), parseInt(this.value, 10));
            for(var i = 0; i < solver.next.length; i++){
                var alert_num = document.querySelector('.raw_' + solver.next[i].row + ' .colum_' + solver.next[i].col);
                if(alert_num.dataset.val !== "setted" && alert_num.dataset.key !== "setted"){
                    alert_num.style.backgroundColor = "#EC8E26";
                    alert_num.dataset.val = solver.next[i].num;
                    alert_num.dataset.key = i;
                }
            }
            this.dataset.key = "setted";
            this.dataset.val = "setted";
        }
    })

})
