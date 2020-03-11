import * as actionType from './actionTypes';

export const createBoard = board => ({
    type: actionType.CREATE_BOARD,
    board: board
})