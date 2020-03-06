import React from "react";
import './Game1.scss'

const NUMBER = 9

function Row(props){
    let col = props.item.map((item, i)=> ( 
        <Col 
            class={item === 1 ? 'col_b' : ''}
            key={'C'+i} 
            rowIndex={props.index} 
            colIndex={i}
            onClick={props.onClick}
        ></Col> 
    ));
    return (
        <div className="row">
            {col}
        </div>
    )
}

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
function getSurroundPostion(position){
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

function Col(props){
    let r = props.rowIndex;
    let c = props.colIndex;
    return (
        <div className={"col "+props.class} onClick={()=> props.onClick([r, c])}></div>
    )
}


class Game1 extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            board : [],
            count: 0,
            finalCount: []
        }
        this.trigger = this.trigger.bind(this);
        this.setSurroundPostion = this.setSurroundPostion.bind(this);
        this.finish = this.finish.bind(this);
    }

    //lifecycle
    componentDidMount(){
        this.setState({board : initalBoard(NUMBER)});
    }

    //設置黑點
    trigger(position){
        let setBoard = JSON.parse(JSON.stringify(this.state.board));
        setBoard[ position[0] ][ position[1] ] = 1;
        this.setState({ board: setBoard }, ()=>{
            this.finish(this.setSurroundPostion(position))
        });
    }

    setSurroundPostion(position){
        let allPos = getSurroundPostion(position);
        let setBoard = JSON.parse(JSON.stringify(this.state.board));
        
        let i = 0;
        
        while(i < allPos.length){
            let current = allPos[i];
            if(allPos[i].length > 0 && setBoard[current[0]][current[1]] === 0){
                setBoard[current[0]][current[1]] = 1;
            }
            i++;
        }
        return setBoard;
        // console.table(setBoard);
        // if(this.state.count < 1){
        //     this.setState({ board : setBoard, count: this.state.count+1 }, ()=>{
                
        //         let d = 0;
        //         while( d < allPos.length ){
        //             this.setSurroundPostion(allPos[d]);
        //             d++;
        //         }
        //     })
        // }
        
    }

    finish(ary){
        console.table(ary);
        this.setState({board: ary});
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