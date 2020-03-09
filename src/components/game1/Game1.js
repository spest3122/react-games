import React from "react";
import './Game1.scss'
import Row from "./Row"

const NUMBER = 9

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
            let data = this.setSurroundPostion(position);
            //this.finish(this.setSurroundPostion(position))
        });
    }

    setSurroundPostion(position){
        
        return result;
    }


    finish(result){

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