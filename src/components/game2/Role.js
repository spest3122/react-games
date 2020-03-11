import React from 'react'
import dog from '../assets/dog.jpg'

class Role extends React.Component {
    render(){
        return(
            <div className="role">
                <img src={dog} alt={"dog"}/>
            </div>
        )
    }
}

export default Role;