// Mapping cell to variable id
//    row: [0, 9)
//    col: [0, 9)
//    num: [1, 9]
function idx(row, col, num) {
    return row * 81 + col * 9 + num;
}
function iidx(id) {
    id -= 1;
    const num = id % 9 + 1;
    id = parseInt(id / 9);
    const col = id % 9;
    const row = parseInt(id / 9);
    return [row, col, num];
}

// Clause for CNF
class Clause {
    constructor(cls) {
        this.cls = [];
        this.var = [];
        this.sign = [];
        this.var2id = {};
        this._remain_num = cls.length;
        this._solved = 0;
        this._conflict = false;
        for(let i=0; i<cls.length; ++i) {
            const var_id = Math.abs(cls[i]);
            this.cls[i] = -1;
            this.var[i] = var_id;
            this.sign[i] = cls[i] < 0;
            this.var2id[var_id] = i;
        }
    }

    set(var_id, val) {
        if( !(var_id in this.var2id) )
            return;
        const id = this.var2id[var_id];
        if( this.cls[id] == -1 ) {
            this.cls[id] = val;
            this._remain_num -= 1;
            this._solved |= (val && !this.sign[id]) || (!val && this.sign[id]);
        }
        else
            this._conflict |= val != this.cls[id];
    }

    get conflict() {
        return (this._remain_num == 0 && !this._solved) || this._conflict;
    }

    get only_one() {
        return this._remain_num == 1;
    }

    get solved() {
        return this._solved;
    }
}

// Encode vars array into caluses to enforce onehot
function onehot_encode(vars) {
    let clauses = [];
    
    // Encode "at least one"
    clauses.push(new Clause(vars))
    
    // Encode "at most one"
    for(let i=0; i<vars.length; ++i)
        for(let j=i+1; j<vars.length; ++j)
            clauses.push(new Clause([-vars[i], -vars[j]]));
    
    return clauses;
}

export default class Sudoku_Helper {
    constructor() {
        this.clauses = [];
        this._next = {};
        this._from = {};

        // Encode each number
        for(let row=0; row<9; ++row)
            for(let col=0; col<9; ++col) {
                let onehot_vars = [];
                for(let num=1; num<=9; ++num)
                    onehot_vars.push(idx(row, col, num));
                this.clauses = this.clauses.concat(onehot_encode(onehot_vars));
            }

        // Encode each row
        for(let row=0; row<9; ++row)
            for(let num=1; num<=9; ++num) {
                let onehot_vars = [];
                for(let col=0; col<9; ++col)
                    onehot_vars.push(idx(row, col, num));
                this.clauses = this.clauses.concat(onehot_encode(onehot_vars));
            }

        // Encode each col
        for(let col=0; col<9; ++col)
            for(let num=1; num<=9; ++num) {
                let onehot_vars = [];
                for(let row=0; row<9; ++row)
                    onehot_vars.push(idx(row, col, num));
                this.clauses = this.clauses.concat(onehot_encode(onehot_vars));
            }

        // Encode each block
        for(let rb=0; rb<3; ++rb)
            for(let cb=0; cb<3; ++cb)
                for(let num=1; num<=9; ++num) {
                    let onehot_vars = [];
                    for(let i=0; i<9; ++i) {
                        const row = rb * 3 + parseInt(i / 3);
                        const col = cb * 3 + (i % 3);
                        onehot_vars.push(idx(row, col, num));
                    }
                    this.clauses = this.clauses.concat(onehot_encode(onehot_vars));
                }
    }

    get next() {
        return Object.keys(this._next).map((k) => {
            const [row, col, num] = k.split(',');
            return {
                'row': parseInt(row, 10),
                'col': parseInt(col, 10),
                'num': parseInt(num, 10),
                'reason': this._next[k],
            }
        });
    }

    get conflict() {
        let has_conflict = false;
        this.clauses.forEach((cls) => {
            has_conflict |= cls.conflict;
        });
        return has_conflict;
    }

    set(row, col, num) {
        delete this._next[[row,col,num]];
        this._set(idx(row, col, num), 1);
        
        let setted = true;
        while( setted ) {
            setted = false;
            this.clauses.forEach((cls) => {
                if( cls.solved || !cls.only_one )
                    return;
                for(let i=0; i<cls.cls.length; ++i)
                    if( cls.cls[i] == -1 ) {
                        if( cls.sign[i] ) {
                            this._set(cls.var[i], 0);
                            if( !(cls.var[i] in this._from) )
                                this._from[cls.var[i]] = [[row, col]];
                            else
                                this._from[cls.var[i]].push([row, col]);
                            setted = true;
                        }
                        else {
                            let reasons = []
                            for(let j=0; j<cls.var.length; ++j) {
                                if( i == j ) continue;
                                let duplicated = false;
                                for(let k=0; k<j; ++k)
                                    if( this._from[cls.var[j]].join() === this._from[cls.var[k]].join() )
                                        duplicated = true;
                                reasons = reasons.concat(this._from[cls.var[j]]);
                            }
                            this._next[iidx(cls.var[i])] = reasons;
                        }
                        break;
                    }
            });
        }
    }

    _set(var_id, val) {
        this.clauses.forEach((cls) => {
            cls.set(var_id, val);
        });
    }
}
