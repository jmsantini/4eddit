import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"
import styled from "styled-components";
import { connect } from "react-redux";
import { createPost } from "../../actions/";

const CreatePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  margin: 10px auto 10px auto;
  border: 1px solid #cdcdcc;
  border-left: 3px solid #c46210;
  border-radius: 6px;
  background-color: white;
  width: 590px;
  font-family: verdana;
  font-size: 11px;
`;

const Create = styled.form`
  display: flex;
  flex-direction: column;
`;

const H1Title = styled.h1`
  text-align: center;
  font-family: verdana;
  color: #4d4d4d;
`

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: ""
    };
  }

  handleFieldChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handlePostButton = () =>{
    this.props.create(this.state.text, this.state.title)
  }

  render() {
    const { text, title } = this.state;

    return (
      
        
      <Create>
      
        <CreatePostContainer>
          <H1Title>Criar post</H1Title>
            <TextField
              onChange={this.handleFieldChange}
              name="title"
              type="text"
              label="Título"
              value={title}
            />
            <TextField
              onChange={this.handleFieldChange}
              name="text"
              type="text"
              label="Texto"
              value={text}
            />

          <Button onClick={this.handlePostButton}>Enviar</Button>
        </CreatePostContainer>
      </Create>
    );
  }
}

const mapDispatchToProps = (dispatch) =>({
    create:(text, title)=> dispatch(createPost(text, title))
})

export default connect(
  null,
  mapDispatchToProps
)(PostCreate);