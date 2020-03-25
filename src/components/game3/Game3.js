import React, {useEffect, useState} from 'react'
import './Game3.scss'



//Pong 遊戲
const Game3 = ()=>{
    const initalPosition = 100  //初始位置
    const maxBoarder = 200  //下邊界
    const minBoarder = 0    //上邊界
    const [ballPosition, setBallPosition] = useState({x: 0, y: 0})

    const ballPath = (n) => {
        console.log(ballPosition);
        if(n < 1){
            return;
        }
        return ballPath(n-1);
    }
    const moveEvent = (e) => {
        //W
        if(e.keyCode === 87){
            setLeftMove(prev=> (prev > minBoarder) ?  prev-5:prev )
        //S
        }else if(e.keyCode === 83){
            setLeftMove(prev=> (prev < maxBoarder) ?  prev+5:prev )
        //Arrow Top
        }else if(e.keyCode === 38){
            setRightMove(prev=> (prev > minBoarder) ?  prev-5:prev )
        //Arrow Down
        }else if(e.keyCode === 40){
            setRightMove(prev=> (prev < maxBoarder) ?  prev+5:prev )
        }else{
            return
        }
    }

    const [leftMove, setLeftMove] = useState(initalPosition);
    useEffect(() => {
        window.addEventListener('keydown', moveEvent)
        return () => {
            window.removeEventListener('keydown', moveEvent)
        }
    }, [leftMove])

    const [RightMove, setRightMove] = useState(initalPosition);
    useEffect(() => {
        window.addEventListener('keydown', moveEvent)
        return () => {
            window.removeEventListener('keydown', moveEvent)
        }
    }, [RightMove])

    useEffect(() => {
        ballPath(2);
    }, [ballPosition])

    return (
        <div className="game3">
            <div className="backGround">
                <div className="role left" style={{top: leftMove}}></div>
                <div className="ball" style={{ left: ballPosition.x, top: ballPosition.Y }}></div>
                <div className="dotted">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="role right" style={{top: RightMove}}></div>
            </div>
        </div>
    )
}

export default Game3