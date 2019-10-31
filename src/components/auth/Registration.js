import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import API from "../../adapters/API";

export class Registration extends Component {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    registrationErrors: ""
  };

  handleChange = e =>
    this.setState({
      [e.target.id]: e.target.value
    });

  handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name
    } = this.state;
    API.register({ email, password, password_confirmation, first_name, last_name })
        .then(user => {
            this.props.login(user)
        })
    // this.setState({
    //     email: '',
    //     password: '',
    //     password_confirmation: '',
    //     first_name: '',
    //     last_name: ''
    // })
    
  };

  render() {
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name
    } = this.state;
    return (
      <>
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input
            label={"First Name"}
            placeholder="First Name"
            value={first_name}
            id="first_name"
            onChange={this.handleChange}
          />

          <Form.Input
            label={"Last Name"}
            placeholder="Last Name"
            value={last_name}
            id="last_name"
            onChange={this.handleChange}
          />

          <Form.Input
            label="Email"
            placeholder="Email"
            type="email"
            id="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            label={"Password"}
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            onChange={this.handleChange}
          />
          <Form.Input
            label={"Password Confirmation"}
            placeholder="Password Confirmation"
            type="password"
            value={password_confirmation}
            id="password_confirmation"
            onChange={this.handleChange}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </>
    );
  }
}

export default Registration;
