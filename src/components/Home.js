import React from "react";
import './Home.scss';
import logo from './assets/logo.svg'

class Home extends React.Component{
    render(){
        const ary = [{},{},{},{},{},{}]
        return (
            <>
            {
                ary.map((item, i)=>(
                    <div className="card" key={'game'+i}>
                        <div className="card__header">
                            <img src={logo} alt="cardHeader" />
                        </div>
                        <div className="card__body">
                            <h2>第{i+1}個遊戲</h2>
                        </div>
                    </div>
                ))
            }
            </>
        )
    }
}

export default Home