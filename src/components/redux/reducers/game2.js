import * as actionType from '../actions/actionTypes';

const initialState = {
    board: [],
    rolePosition: [3, 3],
    history: [],
}

const game2 = (state = initialState, action) => {
    switch(action.type){
        case actionType.CREATE_BOARD:
            return Object.assign({}, state, {
                ...state, 
                board: action.board
            });
        case actionType.ROLE_MOVE:
            return Object.assign({}, state, {
                ...state, 
                rolePosition: action.position
            });
        case actionType.ROLE_HISTORY:
            let newAry = [...state.history];
            newAry.push(action.history);
            return Object.assign({}, state, {
                ...state, 
                history: newAry
            });
        default:
            return state;
    }
}

export default game2;