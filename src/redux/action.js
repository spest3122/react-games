import { ADD_TODO, COMPLETE_TODO, EDIT_TODO, DELE_TODO, DONE_TODO } from "./actionTypes";

export const addTodo = text => {
    return {
        type: ADD_TODO, // 指定 type
        content: text //將接收到的資料
    }
}

export const completeTodo = index => {
    return {
        type: COMPLETE_TODO,
        index: index
    }
}

export const deleteTodo = index => {
    return {
        type: DELE_TODO,
        index: index
    }
}

export const editTodo = index => {
    return {
        type: EDIT_TODO,
        index: index
    }
}

export const doneTodo = content => {
    return {
        type: DONE_TODO,
        content: content
    }
}
