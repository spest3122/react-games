import React from "react";
import './Home.scss';
import logo from './assets/logo.svg'
import routes from "./routes";
import { Link } from 'react-router-dom';

class Home extends React.Component{
    render(){
        let currentRoute = routes.slice(1)
        
        return (
            <>
            {
                currentRoute.map((item, i)=>(
                    <div className="card" key={'game'+i}>
                        <Link to={item.path}>
                            <div className="card__header">
                                <img src={logo} alt="cardHeader" />
                            </div>
                            <div className="card__body">
                                <h2>第{i+1}個遊戲</h2>
                            </div>
                        </Link>
                    </div>
                ))
            }
            </>
        )
    }
}

export default Home