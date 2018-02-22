import Solver from './sudoku_solver.js';

var solver = new Solver;

$('document').ready(function(){
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

    $('.colum').click(function(){
        if(1 <= this.dataset.val && this.dataset.val <= 9){
            console.log(solver.next)
            this.value = this.dataset.val;
            this.style.background = "rgb(255, 111, 111)";
            var reason_cause = solver.next[this.dataset.key].reason;

//`````````````````````Display reason````````````````````````````````````````````````

            for(var i = 0; i < reason_cause.length; i++){
                var reason_num = document.querySelector('.raw_' + reason_cause[i][0] + ' .colum_' + reason_cause[i][1]);
                if(reason_num.dataset.val === "setted") {
                    reason_num.style.background = "rgb(255, 111, 111)";
                } else {
                    reason_num.style.background = "transparent";
                    reason_num.style.color = "#333";
                }
            }

//`````````````````````````````````````````````````````````````````````````````
            solver.set(parseInt(this.dataset.raw, 10), parseInt(this.dataset.colum, 10), parseInt(this.value, 10));
            for(var i = 0; i < solver.next.length; i++){
                var alert_num = document.querySelector('.raw_' + solver.next[i].row + ' .colum_' + solver.next[i].col);
                if(alert_num.dataset.val !== "setted" && alert_num.dataset.key !== "setted"){
                    alert_num.style.backgroundColor = "#EC8E26";
                    alert_num.dataset.val = solver.next[i].num;
                    alert_num.dataset.key = i;
                }
            }
            console.log(solver.next)
            this.dataset.key = "setted";
            this.dataset.val = "setted";
            console.log("no")
        }
    })

})
