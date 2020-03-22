import React from 'react'
import { connect } from 'react-redux';
import { createBoard, roleMove, roleHistory, setDirect } from '../redux/actions'
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
        //地板
        let board = await this.props.board;
        //當前的位置
        let currentPos = await this.props.rolePosition;
        //方向 - 指向某個方向前進則不在比對相對的方向
        let direct = await this.props.direct;  //1 左 2 上 3 右 4 下
        let canPass = [];
        let move = [];
        /**
         * 1. 先判斷上右下左的值可以行走的方向
         * 2. 往版值為0的方向走，並順便儲存行走的方向
         * 3. 相反方向的值不判斷判斷三向的值有零的繼續行走
         * 3. 遇到岔路先以左邊方向為優先順序行走並更改方向值為左
         * 4. 往左移動則更換方向與移動位置
         * 5. 如果三向的值都為牆壁則往返方向移動
         * 
         * 每個recursive 都是一次的移動，所以決定當下移動的點就可以了
         */
        let left = [currentPos[0], currentPos[1]-1];
        let top = [currentPos[0]-1, currentPos[1]];
        let right = [currentPos[0], currentPos[1]+1];
        let bottom = [currentPos[0]+1, currentPos[1]];
        if(left[1] < 0){
            canPass.push(2)
        }else{
            canPass.push(board[left[0]][left[1]])
        }

        if(top[0] < 0){
            canPass.push(2)
        }else{
            canPass.push(board[top[0]][top[1]])
        }

        if(right[1] >= 5){
            canPass.push(2)
        }else{
            canPass.push(board[right[0]][right[1]])
        }

        if(bottom[0] >= 5){
            canPass.push(2)
        }else{
            canPass.push(board[bottom[0]][bottom[1]])
        }
        direct = canPass.indexOf(0);
        if(direct === 0 && direct !== 2){
            move.push(left[0], left[1]);
        }else if(direct === 1 && direct !== 3){
            move.push(top[0], top[1]);
        }else if(direct === 2 && direct !== 0){
            move.push(right[0], right[1]);
        }else if(direct === 3  && direct !== 1){
            move.push(bottom[0], bottom[1]);
        }
        

        if(board[move[0]][move[1]] < 2){
            await this.props.roleMove(move);
            await this.props.roleHistory(move);
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