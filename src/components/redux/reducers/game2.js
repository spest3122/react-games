import * as actionType from '../actions/actionTypes';

const initialState = {
    board: [],
    rolePosition: [4, 3],
    start: false,
}

const game2 = (state = initialState, action) => {
    switch(action.type){
        case actionType.CREATE_BOARD:
            return Object.assign({}, state, {
                ...state, 
                board: action.board
            });
        case actionType.START_MAZE:
            return Object.assign({}, state, {
                ...state, 
                start: !state.start
            });
        case actionType.ROLE_MOVE:
            return Object.assign({}, state, {
                ...state, 
                rolePosition: action.position
            });
        default:
            return state;
    }
}

export default game2;