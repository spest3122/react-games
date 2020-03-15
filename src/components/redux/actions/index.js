import * as actionType from './actionTypes';

export const createBoard = board => ({
    type: actionType.CREATE_BOARD,
    board: board
})

export const roleMove = position =>({
    type: actionType.ROLE_MOVE,
    position: position
})

export const roleHistory = history => ({
    type: actionType.ROLE_HISTORY,
    history: history,
})