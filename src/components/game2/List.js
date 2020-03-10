import React from 'react'
import { FaPen, FaRegTrashAlt, FaRegSave } from 'react-icons/fa';
import { connect } from 'react-redux'
import { doneTodo } from '../../redux/action'

class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            chgInput: this.props.content
        }
        this.saveTodo = this.saveTodo.bind(this);
    }

    changeInput(e) {
        this.setState({chgInput: e.target.value})
    }

    saveTodo(){
        this.props.doneTodo({text: this.state.chgInput, id: this.props.id});
    }


    render(){
        let editButtonSwitch =  this.props.edit ? (
            <div className="doneButton" onClick={this.saveTodo}>
                <FaRegSave />
            </div>
        ) : (
            <div className="editButton" onClick={this.props.onEdit}>
                <FaPen />
            </div>
        )
        let content = this.props.edit ? (
            <input defaultValue={this.props.content} value={this.state.chgInput} onChange={ (e) => this.changeInput(e)}/>
        ) : (this.props.content)

        return(
            <li className={"item " + (this.props.complete ? "middleLine" : "")}>
                <input type="checkbox" onChange={this.props.onCheckbox} defaultChecked={this.props.complete} />
                {content}
                {editButtonSwitch}
                <div className="deleteButton" onClick={this.props.onDelete}>
                    <FaRegTrashAlt />
                </div>
            </li>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doneTodo: (text) => {
            dispatch(doneTodo(text))
        },
    }
}

export default connect(null, mapDispatchToProps)(List)
