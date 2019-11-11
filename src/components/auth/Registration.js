import React, { Component } from "react";
import { Form, Button, Message, Header } from "semantic-ui-react";
import API from "../../adapters/API";
import FormWrapper from "../FormWrapper";

export class Registration extends Component {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    registrationErrors: null
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
    API.register({
      email,
      password,
      password_confirmation,
      first_name,
      last_name
    }).then(user => {
      if (user.errors) {
        this.setState({ registrationErrors: user.errors });
      } else {
        this.props.login(user);
      }
    });
  };

  render() {
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      registrationErrors
    } = this.state;
    return (
      <FormWrapper windowWidth={this.props.windowWidth}>
        <Header as="h1">Register</Header>
        {registrationErrors ? (
          <Message negative>
            <ul>
              {registrationErrors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Message>
        ) : null}
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
      </FormWrapper>
    );
  }
}

export default Registration;
