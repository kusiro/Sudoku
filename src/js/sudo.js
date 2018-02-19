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
            document.querySelector(alert_num).name = solver.next[i].num;
            document.querySelector(alert_num).dataset.key = i;
        }
    })
    $('.colum').hover(function(){
        if(1 <= this.name && this.name <= 9){
            var reason_cause = solver.next[this.dataset.key].reason;
            for(var i = 0; i < reason_cause.length; i++){
                var reason_num = '.raw_' + reason_cause[i][0] + ' .colum_' + reason_cause[i][1];
                document.querySelector(reason_num).style.backgroundColor = "green";
            }
        }
    });
    $('.colum').mouseleave(function(){
        if(1 <= this.name && this.name <= 9){
            var reason_cause = solver.next[this.dataset.key].reason;
            for(var i = 0; i < reason_cause.length; i++){
                var reason_num = '.raw_' + reason_cause[i][0] + ' .colum_' + reason_cause[i][1];
                document.querySelector(reason_num).style.background = "transparent";
            }
        }
    });

    $('.colum').click(function(){
        if(1 <= this.name && this.name <= 9){
            this.value = this.name;
            this.style.background = "transparent";
            var reason_cause = solver.next[this.dataset.key].reason;
            for(var i = 0; i < reason_cause.length; i++){
                var reason_num = '.raw_' + reason_cause[i][0] + ' .colum_' + reason_cause[i][1];
                document.querySelector(reason_num).style.background = "transparent";
            }
            
            solver.set(parseInt(this.dataset.raw, 10), parseInt(this.dataset.colum, 10), parseInt(this.value, 10));
            for(var i = 0; i < solver.next.length; i++){
                var alert_num = '.raw_' + solver.next[i].row + ' .colum_' + solver.next[i].col
                document.querySelector(alert_num).style.backgroundColor = "#EC8E26";
                document.querySelector(alert_num).name = solver.next[i].num;
            }

        }
    })

})
