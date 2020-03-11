import * as actionType from '../actions/actionTypes';

const initialState = {
    board: [],
    rolePosition: [4, 3]
}

const game2 = (state = initialState, action) => {
    switch(action.type){
        case actionType.CREATE_BOARD:
            return Object.assign({}, state, {
                ...state, 
                board: action.board
            });
        default:
            return state;
    }
}

export default game2;