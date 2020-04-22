import React, {Component, Fragment} from "react";
import { routes } from "../Router";
import { getPosts } from "../../actions";
import { connect } from "react-redux";
import styled from "styled-components";
import { push } from "connected-react-router";
import { getPostDetail } from "../../actions";
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import PostCreate from "../PostCreate";
import { putVote } from "../../actions";
import Fade from 'react-reveal/Fade';
import Loading from "../../components/Loading"



const PostDiv = styled.div`
    border: 1px solid #cdcdcc;
    padding: 5px;
    margin: 10px auto 10px auto;
    background-color: white;
    max-width: 50%;
    border-radius: 6px;
    font-family: verdana;
    font-size: 11px;
    border-left: 3px solid #c46210;
`;

const PostContainer = styled.div`
    margin: auto;
`

const UserName = styled.p`
    border-bottom: 1px solid grey;
    margin-top: 2px;
`
const PostTittle = styled.p`
    font-weight: bold;
`;

const BackgroundDiv = styled.div`
    background-color: #fecbbd;
    display: flex;
    justify-content: center;
`

const DetailsButton = styled.button`
    background-color: white;
    border: 1px solid grey;
    border-radius: 5px;
    margin: 10px 0 5px 0;
    font-size: 15px;
    cursor: pointer;
`;

const ButtonDirection = styled.label`
    cursor: pointer;
`;

const PostedBy = styled.span`
    color: grey;
    font-size: 9px;
`

const LogoutDiv = styled.div`
    padding: 20px 0 0 100px;
` 

const H1Title = styled.h1`
    text-align: center;
    font-family: verdana;
    color: #4d4d4d;
`

export class PostList extends Component {
    
    
    componentDidMount(dispatch) {
        this.props.getPosts(this.props.id)
    }

    handleLogOut = () => {
        localStorage.removeItem("token")
        this.props.goToHome()

    }


    handleIdPostAndGoToPostDetails = (postId, event) =>{
        this.props.getPostId(postId);
        this.props.goToPostDetails();
    }

    render(){
        
        // let filterPostText = this.props.posts.filter((post) =>{
        //     return post.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 || 
        //     post.text.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ;
        // })

        let loadingPage = this.props.posts.length === 0 ? <Loading/> : (
          <Fragment>
            {this.props.posts.sort((a,b) => {
                                if (a.votesCount < b.votesCount) {
                                    return 1 ;
                                }else {
                                    return -1 ;
                            }
                        }).map((posts)=>
                            <Fade bottom>
                                <PostDiv>
                                    <UserName>
                                        <PostedBy
                                            >Postado por: 
                                        </PostedBy>
                                            {posts.username}
                                    </UserName>
                                    <PostTittle>
                                        {posts.title}
                                    </PostTittle>
                                    <hr/>
                                    {posts.text}  
                                    <div>({posts.commentsNumber}) comentários</div> 
                                    <div>
                                         <ButtonDirection><ArrowUpwardRoundedIcon  onClick={ ()=> { this.props.votePost(posts.id, 1)} }/></ButtonDirection>({posts.votesCount})
                                         <ButtonDirection><ArrowDownwardRoundedIcon onClick={ ()=> { this.props.votePost(posts.id, -1)}}/></ButtonDirection>
                                     </div>
                                    <DetailsButton onClick={() => this.handleIdPostAndGoToPostDetails(posts.id)} >Detalhes do post</DetailsButton>
                                </PostDiv>
                            </Fade>)}
          </Fragment>  
        )

       return(
            
            <BackgroundDiv>
                <LogoutDiv>
                    <DetailsButton onClick= {this.handleLogOut} >Logout</DetailsButton>
                </LogoutDiv>
                <PostContainer>
                    <PostCreate/>
                    <H1Title>Posts</H1Title>
                      {loadingPage}      
                </PostContainer>
            </BackgroundDiv>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.allPosts,
    idSelectedPost: state.posts.postId,
})

const mapDispatchToProps = (dispatch) => ({
    getPosts: () => dispatch(getPosts()),
    goToPostDetails: ()=> dispatch(push(routes.postdetails)),
    getPostId: (postId)=> dispatch(getPostDetail(postId)),
    goToHome: () => dispatch(push(routes.home)),
    votePost: (direction, postId) => dispatch(putVote(direction, postId))

})


export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PostList);