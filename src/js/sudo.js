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
        }
    })
    $('.colum').click(function(){
        if(1 <= this.name && this.name <= 9){
            this.value = this.name;
            this.style.background = "transparent";
            solver.set(parseInt(this.dataset.raw, 10), parseInt(this.dataset.colum, 10), parseInt(this.value, 10));
            for(var i = 0; i < solver.next.length; i++){
                var alert_num = '.raw_' + solver.next[i].row + ' .colum_' + solver.next[i].col
                document.querySelector(alert_num).style.backgroundColor = "#EC8E26";
                document.querySelector(alert_num).name = solver.next[i].num;
            }
        }
    })

})
