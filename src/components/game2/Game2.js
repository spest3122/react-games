import React from 'react'
import { connect } from 'react-redux';
import { createBoard, roleMove, roleHistory } from '../redux/actions'
import Role from "./Role";
import './Game2.scss';
const NUMBER = 5;
const SECOND = 1000; //一秒

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
        let gameStatus = true;
        await this.props.roleHistory(Object.assign([], this.props.rolePosition));
        await this.dogMove();
    }
    
    async dogMove(){
        let board = await this.props.board;
        let currentPos = await this.props.rolePosition;
            
            // let top = [currentPos[0]-1, currentPos[1]];
            // let right = [currentPos[0], currentPos[1]+1];
            // let bottom = [currentPos[0]+1, currentPos[1]];
        let left = [currentPos[0], currentPos[1]-1];
        if(board[left[0]][left[1]] < 2){
            await this.props.roleMove(left);
            await this.props.roleHistory(left);
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
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Game2);