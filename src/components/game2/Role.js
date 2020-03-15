import React from 'react'
import dog from '../assets/dog.jpg'

class Role extends React.Component {
    render(){
        return(
            <div className="role" onClick={this.props.onClick}>
                <div className="shadow">Start</div>
                <img src={dog} className="avatar" alt={"dog"}/> 
            </div>
        )
    }
}


export default Role;