import React, {useEffect, useState} from 'react'
import './Game3.scss'



//Pong 遊戲
const Game3 = ()=>{
    const initalPosition = 100  //初始位置
    const backgroundWidth = 500  //背景寬度
    const backgroundHeight = 300  //背景高度度
    const roleHeight = 100      //角色高度
    const maxRoleBorder = 200   //角色下邊界
    const minRoleBorder = 0     //角色上邊界
    const moveGrid = 10         //移動格數
    const timeLimit = 50       //移動速率
    const ballSize = 20;       //球的尺寸
    const leftBorder = 0;
    const rightBorder = backgroundHeight - ballSize;
    const topBorder = 0;
    const bottomBorder = backgroundWidth - ballSize;
    const [ballPosition, setBallPosition] = useState({x: 40, y: 100})  //右下(480,280) 左上(0,0) 右上(480,0) 左下(0, 280)
    const [direct, setDirect] = useState('RB')//T 上 R 右 B 下 L左 球行進的方向

    const ballPath = () => {
        let x = ballPosition.x  //球的X座標
        let y = ballPosition.y  //球的Y座標
        
        switch (direct) {
            //右下
            case 'RB':
                x += moveGrid
                y += moveGrid
                break;
            //右上
            case 'RT':
                x += moveGrid
                y -= moveGrid
                break;
            //左上
            case 'LT':
                x -= moveGrid
                y -= moveGrid
                break;
            //左下
            case 'LB':
                x -= moveGrid
                y += moveGrid
                break;
            default:
                break;
        }
        
        if(y === rightBorder){
            if(direct === 'RB'){
                setDirect('RT')
            }else if(direct === 'LB'){
                setDirect('LT')
            }
        }else if(y === leftBorder){
            if(direct === 'RT'){
                setDirect('RB')
            }else if(direct === 'LT'){
                setDirect('LB')
            }
        }else if(x === bottomBorder){
            if(direct === 'RT'){
                setDirect('LT')
            }else if(direct === 'RB'){
                setDirect('LB')
            }
        }else if(x === topBorder){
            if(direct === 'LT'){
                setDirect('RT')
            }else if(direct === 'LB'){
                setDirect('RB')
            }
        }
        
        setTimeout(() => {
            setBallPosition({x: x, y: y})
        }, timeLimit);

    }
    const moveEvent = (e) => {
        //W
        if(e.keyCode === 87){
            setLeftMove(prev=> (prev > minRoleBorder) ?  prev-5:prev )
        //S
        }else if(e.keyCode === 83){
            setLeftMove(prev=> (prev < maxRoleBorder) ?  prev+5:prev )
        //Arrow Top
        }else if(e.keyCode === 38){
            setRightMove(prev=> (prev > minRoleBorder) ?  prev-5:prev )
        //Arrow Down
        }else if(e.keyCode === 40){
            setRightMove(prev=> (prev < maxRoleBorder) ?  prev+5:prev )
        }else{
            return
        }
    }
    //左邊方塊的上下移動
    const [leftMove, setLeftMove] = useState(initalPosition);
    useEffect(() => {
        window.addEventListener('keydown', moveEvent)
        return () => {
            window.removeEventListener('keydown', moveEvent)
        }
    }, [leftMove])

    //右邊方塊的上下移動
    const [RightMove, setRightMove] = useState(initalPosition);
    useEffect(() => {
        window.addEventListener('keydown', moveEvent)
        return () => {
            window.removeEventListener('keydown', moveEvent)
        }
    }, [RightMove])
    //球的運行軌跡
    useEffect(() => {
        ballPath();
    }, [ballPosition])

    return (
        <div className="game3">
            <div className="backGround" style={{ width: backgroundWidth, height: backgroundHeight }}>
                <div className="role left" style={{top: leftMove, height: roleHeight }}></div>
                <div className="ball" style={{ left: ballPosition.x, top: ballPosition.y, width: ballSize, height: ballSize }}></div>
                <div className="dotted">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="role right" style={{top: RightMove, height: roleHeight}}></div>
            </div>
        </div>
    )
}

export default Game3