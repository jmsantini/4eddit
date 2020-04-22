const initialState = {
    postData: {}
};

const createpost = ( state = initialState, action ) => {
    switch(action.type){
        case "CREATE_POST":
            return {...state, postData: action.payload.createpost}

            default:
                return state;
    }
}

export default createpost;