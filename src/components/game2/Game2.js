import React from "react";
import './Game2.scss';
import List from "./List";
import { connect } from 'react-redux'
import { addTodo, completeTodo, deleteTodo, editTodo } from '../../redux/action'

class Game2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            addInput: ""
        }
        this.addTodoList = this.addTodoList.bind(this);
        this.getInput = this.getInput.bind(this);
    }

    getInput(e){
        this.setState({
            addInput: e.target.value
        })
    }

    //新增待辦清單
    addTodoList(){
        let text = this.state.addInput.trim();
        if(text === ""){
            return;
        }
        this.props.addTodo(text)
        this.setState({ addInput: "" })
    }

    //完成待辦清單
    completeTodoList(id){
        this.props.completeTodo(id);
    }

    //編輯待辦清單
    editTodoList(index){
        this.props.editTodo(index);
    }

    //刪除待辦清單
    deleteTodoList(index){
        this.props.deleteTodo(index);
    }

    render(){
        let todoList = this.props.todos.map((item,index)=>(
            <List
                key={'list'+index}
                {...item}
                onCheckbox={ () => this.completeTodoList(index) }
                onEdit={ () => this.editTodoList(index) }
                onDelete={ () => this.deleteTodoList(index) }
            />
        ));

        return(
            <div>
                {/* 列表清單資料 */}
                <ul className="listData">
                    {todoList}
                </ul>
                <div className="addInput">
                    <input type="text" value={this.state.addInput} onChange={this.getInput}/>
                    <button onClick={this.addTodoList}>新增</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: (text) => {
            dispatch(addTodo(text))
        },
        completeTodo: (index) => {
            dispatch(completeTodo(index))
        },
        deleteTodo: (index)=>{
            dispatch(deleteTodo(index))
        },
        editTodo: (index)=>{
            dispatch(editTodo(index))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game2)
