const initialState = {
    isLoged: false
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case 'LOGIN' :
            return { isLoged: true }
        case 'LOGOUT' :
            return { isLoged: false }
        default: 
            return state
    }
}

export default rootReducer;