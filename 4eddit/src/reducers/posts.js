const initialState = {
    allPosts: [],
    selectPostId: "",
    selectedPost: {},
};

export const posts = ( state = initialState, action ) => {
    switch(action.type){
        case "SET_POSTS":
            return {...state, allPosts: action.payload.posts}
        case  "SET_POSTS_ID":
            return {...state, selectPostId: action.payload.postId}
        case "SET_POST_DETAIL": 
            return { ...state, selectedPost: action.payload.detail}
            default:
                return state;
    }
}

export default posts;