const initialState = {
    isLoged: false,
    userId: '111111111111',
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN' :
            return { isLoged: true, userId: action.userId }
        case 'LOGOUT' :
            return { isLoged: false, userId: action.userId }
        default: 
            return state
    }
}

export default rootReducer;