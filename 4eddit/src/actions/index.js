import axios from "axios";
import { routes } from "../containers/Router";
import { push } from "connected-react-router";

const baseUrl = "https://us-central1-missao-newton.cloudfunctions.net/fourEddit"

const postLogin = (login) => ({
    type: 'POST_LOGIN',
    payload: {
        login,
    }
})

const setPosts = (posts) => ({
    type: "SET_POSTS",
    payload: {
        posts,
    }
})

const setCreateUser = (user) => ({
    type: "CREATE_USER",
    payload: {
        user,
    }
})

const setCreatePost = (createpost) => ({
    type: "CREATE_POST",
    payload: {
        createpost,
    }
})


const setPostDetail = (detail) => ({
    type: "SET_POST_DETAIL",
    payload: {
        detail,
    }
})

export const postLoginUser = (email, password) => async (dispatch) =>{
  
    const newUser = {
        email,
        password,
    }

    try{
      const response = await axios.post(`${baseUrl}/login`, newUser)
            window.localStorage.setItem("token", response.data.token);

        dispatch(postLogin())
            window.alert("Login Realizado com sucessso!!!");
                dispatch(push(routes.postlist))
    }catch(error){
        window.alert("Login ou senha incorreta!!!")
    }

}

export const createUser = (email, password, username) => async (dispatch) =>{


    const data = {
        email,
        password, 
        username
    }

    try {
       const response = await axios.post(`${baseUrl}/signup`, data)
            window.localStorage.setItem("token", response.data.token);
            dispatch(setCreateUser())
                alert('Cadastro realizado com sucesso!')
                    dispatch(push(routes.postlist))
    } catch(error){
        window.alert('Erro no cadastro')
    }

}

export const createPost = ( text, title) => async (dispatch) => {

    const token = localStorage.getItem("token")


    const newPost = {
        text,
        title,
    }
    try {
        await axios.post(`${baseUrl}/posts`, newPost, {
            headers:{
                auth: token,
            }

        })
        dispatch(setCreatePost())
        window.alert("Post criado com sucesso!!!")
    }catch(erro){
        window.alert("Erro ao Criar Post")
    }
}


export const getPosts = () => async (dispatch) => {
    
    const token = localStorage.getItem("token")


    try{
    const response = await axios.get(`${baseUrl}/posts`,{
        headers: {
            auth: token,
        }
    })
    dispatch(setPosts(response.data.posts))
    }catch(error){
        window.alert("Erro ao Buscar")

    }

}

export const getPostDetail = (postId) => async (dispatch) =>{

    const token = localStorage.getItem("token")

    try{
        const response = await axios.get(`${baseUrl}/posts/${postId}`, {
            headers: {
                auth: token,
            }
        })
        dispatch(setPostDetail(response.data.post))
        
    }catch(error){
        window.alert("Erro ao Buscar Detalhes")
    }
}

export const postCreateComment = ( postId, text ) => async (dispatch) =>{
  
    const token = localStorage.getItem("token")

    const newComment = {
        text
    }

    try{
      await axios.post(`${baseUrl}/posts/${postId}/comment`, newComment, {
          headers: {
              auth: token,
          }
      })
          window.alert("Comentario Enviado")  
      dispatch(getPostDetail(postId))
      
    }catch(error){
        window.alert("Erro ao criar um comentario")
    }

}

export const putVote = (postId, direction) => async (dispatch) =>{
    const token = localStorage.getItem("token")
    
        const data = {
            direction,
        }
        try{
            await axios.put(`${baseUrl}/posts/${postId}/vote`, data, {
                headers: {
                    auth: token,
                }
            })
            dispatch(getPosts())
        }catch (error){
            window.alert("Não foi possível contabilizar seu Voto!!!")
        }
}

export const putVoteComment = (postId, commentId, direction) => async (dispatch) =>{
    const token = localStorage.getItem("token")

    const data = {
        direction,
    }

    try{
        await axios.put(`${baseUrl}/posts/${postId}/comment/${commentId}/vote`, data, {
            headers: {
                auth: token,
            }
        })
        dispatch(getPostDetail(postId, commentId))
    }catch(error){
        window.alert("Não foi possível contabilizar seu Voto!!!")
    }
}