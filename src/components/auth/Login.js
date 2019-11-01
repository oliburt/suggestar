import React, { Component } from "react";
import { Form, Button, Message, Header } from "semantic-ui-react";
import API from "../../adapters/API";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: null
  };

  handleChange = e =>
    this.setState({
      [e.target.id]: e.target.value
    });

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    API.login({
      email,
      password
    }).then(user => {
      if (user.errors) {
        this.setState({ errors: user.errors });
      } else {
        this.props.login(user);
      }
    });
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <>
        <Header as='h1'>Login</Header>

        {errors ? (
          <Message negative>
            <ul>
              {errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Message>
        ) : null}
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
