import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import API from "../../adapters/API";

export class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  handleChange = e =>
    this.setState({
      [e.target.id]: e.target.value
    });

  handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      password
    } = this.state;
    API.login({
      email,
      password
    }).then(user => {
        if (user) {
            this.props.login(user);
        } else {
            console.log(user)
        }
    });
  };

  render() {
    const { email, password } = this.state;
    return (
      <>
        <h1>Login</h1>
        <Form onSubmit={this.handleSubmit}>
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
          <Button type="submit">Submit</Button>
        </Form>
      </>
    );
  }
}

export default Login;
