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
        console.log(solver.next);
    })
})
