const initialState = {
    userData: {}
};

export const users = ( state = initialState, action ) => {
    switch(action.type){
        case "CREATE_USER":
            return {...state, userData: action.payload.users}

            default:
                return state;
    }
}

export default users;