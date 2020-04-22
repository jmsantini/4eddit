import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"
import styled from "styled-components";
import { connect } from "react-redux";
import { postLoginUser } from "../../actions"

const DivContet = styled.div`
  display:flex;
  justify-content: center;
  background-color: #fecbbd;
  height: 100vh;
  align-items: center;
`


const LoginWrapper = styled.form`
  display: flex;
  flex-direction: column;
`;




class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleLoginButton = () =>{
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    const { email, password } = this.state;

    return (
      <DivContet>
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
            name="password"
            type="password"
            label="password"
            value={password}
          />

          <Button onClick={this.handleLoginButton}>Login</Button>
        </LoginWrapper>
      </DivContet>     
    );
  }
}

const mapDispatchToProps = (dispatch) =>({
  login: (email, password) => dispatch(postLoginUser(email, password)),
})

export default connect(
  null,
  mapDispatchToProps
)(LoginPage);