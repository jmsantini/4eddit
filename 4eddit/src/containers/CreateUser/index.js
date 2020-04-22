import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"
import styled from "styled-components";
import { routes } from "../Router/index";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { createUser } from "../../actions";


const MainContent = styled.div`
  display:flex;
  justify-content: center;
  background-color: #fecbbd;
  height: 100vh;
  align-items: center;
`;


const LoginWrapper = styled.form`
 display: flex;
 flex-direction: column;
`;




class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
    };
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSignupButton = () =>{
    this.props.createUser(this.state.email, this.state.password, this.state.username)
  }


  render() {
    const { email, password, username } = this.state;

    return (
    
    <MainContent>
      <LoginWrapper>
        <TextField
          onChange={this.handleFieldChange}
          name="email"
          type="email"
          label="E-mail"
          value={email}
        />
        
        <TextField 
         onChange={this.handleFieldChange}
         name="username"
         type="text"
         label="Usuário"
         value={username}
        />

        <TextField
          onChange={this.handleFieldChange}
          name="password"
          type="password"
          label="Password"
          value={password}
        />
        <Button onClick={this.handleSignupButton}>Cadastrar</Button>
      </LoginWrapper>
    </MainContent>
    );
  }
}

const mapDispatchToProps = (dispatch) =>({
  createUser: (email, password, username) => dispatch(createUser(email, password, username)),
  
})

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);