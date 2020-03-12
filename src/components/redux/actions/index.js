import * as actionType from './actionTypes';

export const createBoard = board => ({
    type: actionType.CREATE_BOARD,
    board: board
})

export const startMaze = ()=>({
    type: actionType.START_MAZE,
})

export const roleMove = position =>({
    type: actionType.ROLE_MOVE,
    position: position
})