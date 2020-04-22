import React, { Component } from "react";
import Button from "@material-ui/core/Button"
import styled from "styled-components";
import logo from "../../img/logo.png";
import { routes } from "../Router";
import { connect } from "react-redux";
import { push } from "connected-react-router";


const MainDiv = styled.div`
    display:flex;
    flex-direction: column;
    padding: 10%;
    background-color: #fecbbd;
    height: 100vh;
`;

const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonDiv = styled.div`
`;



const Logo = styled.img`
    margin-bottom: 100px;
    max-width: 350px;

`;

export class Home extends Component {

    componentDidMount(dispatch){
        const token = window.localStorage.getItem("token")
        if(token === null) {
            this.props.goToHome()
        } else {
            this.props.goToPosts()
        }
    }

  render(){
        return(
            <MainDiv>

            <MainContent>
                <Logo src={logo}/>
                    <ButtonDiv>
                        <Button onClick= {this.props.goToSingUP} size="large" variant="outlined" >Cadastrar</Button>
                        <Button onClick= {this.props.goToLogin} size="large" variant="outlined" >Login</Button>
                    </ButtonDiv>
            </MainContent>
        </MainDiv>
        );
    }
}


const mapDispatchToProps = (dispatch) =>({
    goToSingUP: () => dispatch(push(routes.createUser)),
    goToLogin: () => dispatch(push(routes.login)),
    goToPosts: () => dispatch(push(routes.postlist)),
    goToHome: () => dispatch(push(routes.home))

  })

export default connect(
    null,
    mapDispatchToProps
  )(Home);