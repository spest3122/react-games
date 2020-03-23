import React from 'react'
import { connect } from 'react-redux';
import { createBoard, roleMove, roleHistory, setDirect } from '../redux/actions'
import Role from "./Role";
import './Game2.scss';
const NUMBER = 5;
const SECOND = 500; //一秒

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


class Game2 extends React.Component {
    //設置場地
    componentDidMount(){
        this.props.createBoard(this.setMap());
    }

    async start(){
        // await this.props.roleHistory(Object.assign([], this.props.rolePosition));
        await this.dogMove();
    }
    
    async dogMove(){
        //地板
        let board = await this.props.board;
        //當前的位置
        let currentPos = await this.props.rolePosition;
        if(currentPos[0] === 0 && currentPos[1] === 1){
            alert('You Finish')
            return 
        }
        //方向 - 指向某個方向前進則不在比對相對的方向
        let direct = await this.props.direct;  //0 左 1 上 2 右 3 下
        let move = [];
        
        let left = currentPos[1]-1;
        let top = currentPos[0]-1;
        let right = currentPos[1]+1;
        let bottom = currentPos[0]+1;
        

        if(left >= 0 && board[currentPos[0]][left] < 2  && move.length === 0 && direct !== 2){
            move.push(currentPos[0], left)
            direct = 0
        }

        if(top >= 0 && board[top][currentPos[1]] < 2 && move.length === 0 && direct !== 3){
            move.push(top, currentPos[1])
            direct = 1
        }

        if(right < 5 && board[currentPos[0]][right] < 2 && move.length === 0 && direct !== 0){
            move.push(currentPos[0], right)
            direct = 2
        }

        if(bottom < 5 && board[bottom][currentPos[1]] < 2 && move.length === 0  && direct !== 1){
            move.push(bottom, currentPos[1])
            direct = 3
        }

        if(move.length < 1){
            if(direct === 0){
                direct = 2
            }else if(direct === 1){
                direct = 3
            }else if(direct === 2){
                direct = 0
            }else if(direct === 3){
                direct = 1
            }
            await this.props.setDirect(direct);
            return this.dogMove();
        }
        
        
        
        if(board[move[0]][move[1]] < 2){
            await this.props.roleMove(move);
            // await this.props.roleHistory(move);
            await this.props.setDirect(direct);
            return setTimeout(()=> this.dogMove(), SECOND)
        }else{
            return;
        }
    }

    //設置迷宮
    setMap(){
        //1. 設置障礙物
        let map = initalBoard(NUMBER);
        let i = 0;
        while(i < NUMBER){
            let j = 0;
            while(j < NUMBER){
                if(j === 0 || j === 4){
                    map[i][j] = 2;
                }
                if(j >= 2 && i === 0){
                    map[i][j] = 2;
                }
                if(j < 3 && i === 4){
                    map[i][j] = 2;
                }
                if((j === 2 || j === 1) && i === 2){
                    map[i][j] = 2;
                }
                j++;
            }
            i++;
        }
        return map;
    }
    
    render(){
        let map = this.props.board.map((row, i) => (
            <div className="row" key={'row'+i}>
                {
                    row.map((col, colIndex)=>{
                        let style = "col ";
                        let role = (i === this.props.rolePosition[0] && colIndex === this.props.rolePosition[1]) ? <Role onClick={()=> this.start()} /> : "";
                        if(col === 2){
                            style += "block ";
                        }
                        return (
                            <div className={style} key={i +"-"+colIndex}>{role}</div>
                        )
                    })
                }
            </div>
        ))
        return (
            <div className="Game2">
                <h2 className="title">膽小狗英雄 - 走迷宮</h2>
                {map}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    board: state.game2.board,
    rolePosition: state.game2.rolePosition,
    history: state.game2.history,
    direct: state.game2.direct
})

const mapDispatchToProps = (dispatch) => ({
    createBoard: (board)=>{
        dispatch(createBoard(board))
    },
    roleMove: (move)=>{
        dispatch(roleMove(move))
    },
    roleHistory: (history)=>{
        dispatch(roleHistory(history))
    },
    setDirect: (direct)=>{
        dispatch(setDirect(direct))
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(Game2);