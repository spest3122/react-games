import React from "react";
import './Game1.scss'
import Row from "./Row"

const NUMBER = 13

//生成版面
function initalBoard(number){
    let ary = [];
    let i = 0;
    while(i < number){
        let row = []
        let j = 0;
        while(j < number){
            row.push(0);
            j++;
        }
        ary.push(row);
        i++;
    }
    return ary;
}
//取得周圍的黑點
function getSurroundPostion(position, board){
    let j = 0;
    let allPos = [] // 0 上 1 右 2 下 3 左
    let maxLimit = NUMBER - 1;
    while(j < 4){
        let surround = [];
        let newPositionX = position[0];
        let newPositionY = position[1];
        if(j === 0){
            if(newPositionX <= maxLimit && newPositionX > 0){
                newPositionX -= 1;
            }
        }else if(j === 1){
            if(newPositionY < maxLimit && newPositionY >= 0){
                newPositionY += 1;
            }
        }else if(j === 2){
            if(newPositionX < maxLimit && newPositionX >= 0){
                newPositionX += 1;
            }
        }else if(j === 3){
            if(newPositionY <= maxLimit && newPositionY > 0){
                newPositionY -= 1;
            }
        }
        surround = [newPositionX, newPositionY]
        allPos.push(surround);
        j++;
    }
    return allPos;
}


function deepClone(obj){
    return JSON.parse(JSON.stringify(obj))
}



class Game1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board : [],
            count: 0,
            finalCount: [],
            timeLimit: 500
        }
        this.trigger = this.trigger.bind(this);
        this.setSurroundPostion = this.setSurroundPostion.bind(this);
    }

    //lifecycle
    componentDidMount(){
        this.setState({board : initalBoard(NUMBER)});
    }

    //設置黑點
    trigger(position){
        let setBoard = deepClone(this.state.board);
        setBoard[ position[0] ][ position[1] ] = 1;
        this.setState({ board: setBoard }, ()=>{
            setTimeout(()=>{
                this.setSurroundPostion(position);
            }, this.state.timeLimit)
        });
    }

    setSurroundPostion(position){
        let setBoard = deepClone(this.state.board);
        let mainNumber = NUMBER;
        let hasZero = [];
        let i = 0;
        let j = 0;
        let resultPlace = [];
        while(i < mainNumber){
            if(setBoard[i].indexOf(0) < 0){
                hasZero.push(true)
            }
            while(j < mainNumber){
                if(setBoard[i][j] === 1){
                    let four = getSurroundPostion([i, j]);
                    if(setBoard[four[0][0]][four[0][1]] === 0){
                        resultPlace.push(four[0][0] +","+ four[0][1]);
                    }
                    if(setBoard[four[1][0]][four[1][1]] === 0){
                        resultPlace.push(four[1][0] +","+ four[1][1]);
                    }
                    if(setBoard[four[2][0]][four[2][1]] === 0){
                        resultPlace.push(four[2][0] +","+ four[2][1]);
                    }
                    if(setBoard[four[3][0]][four[3][1]] === 0){
                        resultPlace.push(four[3][0] +","+ four[3][1]);
                    }
                }
                j++;
            }
            i++;
            j = 0;
        }
        let s = deepClone(setBoard);
        let d = 0;
        while(d < resultPlace.length){
            let a = resultPlace[d].split(",");
            s[a[0]][a[1]] = 1;
            d++;
        }
        this.setState({board: s})
        if(hasZero.length >= NUMBER){
            console.log("done");
            
            return;
        }else{
            setTimeout(()=>{
                this.setSurroundPostion(position);
            }, this.state.timeLimit)
            return;
        }
    }

    render(){
        let setBoard = this.state.board.map((item,i)=>(
            <Row item={item} key={'R'+i} onClick={this.trigger} index={i}/>
        ))

        return (
            <div className="Game1">
                {setBoard}
            </div>
        )
    }
}

export default Game1;