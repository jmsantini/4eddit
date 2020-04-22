const initialState = {
    allLogin: []

}

const login = (state = initialState, action) => {
    switch(action.type){
        case  'POST_LOGIN':
            return {...state, allLogin: action.payload.login}
        default:
            return state
    }
}

export default login;