import React, { Component } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import API from "../adapters/API";

export class UserEdit extends Component {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
    errors: null
  };

  componentDidMount() {
      if (!this.props.isAuthenticated) {
          this.props.history.push('/')
      } else {
          API.getUserDetails().then(console.log)
      }
  }
  

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
    // API.register({ email, password, password_confirmation, first_name, last_name })
    //     .then(user => {
    //         if (user.errors) {
    //             this.setState({ registrationErrors: user.errors });
    //           } else {
    //             this.props.login(user);
    //           }
    //     })

    
  };

  render() {
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      errors
    } = this.state;
    return (
      <>
        <h1>Edit Details Below</h1>
        {errors ? (
          <Message negative>
            <ul>
              {errors.map(error => (
                <li>{error}</li>
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
          <Button as={Link} to={`/users/${this.props.user ? this.props.user.id : ''}`}>Back</Button>
        </Form>
      </>
    );
  }
}

export default UserEdit;
