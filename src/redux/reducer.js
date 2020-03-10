import * as _action from './actionTypes'

const initialState = {
    textFilter: {
        text: "not"
    },
    todos: [
        {
            id: 1,
            content: "first todo",
            edit: false,
            complete: false,
        },
        {
            id: 2,
            content: "second todo",
            edit: false,
            complete: true,
        },
    ]
}


function todoApp(state = initialState, action) {
    switch (action.type) {
        case _action.ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        id: state.todos.length+1,
                        content: action.content,
                        edit: false,
                        complete: false
                    }
                ]
            })
        case _action.COMPLETE_TODO:
            let data = JSON.parse(JSON.stringify(state));
            data.todos[action.index].complete = !data.todos[action.index].complete
            return data;

        case _action.DELE_TODO:
            let deleteRemainData = JSON.parse(JSON.stringify(state));
            deleteRemainData.todos.splice(action.index, 1);
            return deleteRemainData;
        case _action.EDIT_TODO:
            let editOpenData = JSON.parse(JSON.stringify(state));
            editOpenData.todos[action.index].edit = !editOpenData.todos[action.index].edit;
            return editOpenData
        case _action.DONE_TODO:
            let doneData = JSON.parse(JSON.stringify(state));
            doneData.todos.map((item)=>{
                if(item.id === action.content.id){
                    item.content = action.content.text;
                    item.edit = false;
                }
                return item;
            })
            return doneData;
        default:
            return state;
    }
}

export default todoApp;
