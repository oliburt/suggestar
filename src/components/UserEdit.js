import React, { Component } from "react";
import { Form, Button, Message, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import API from "../adapters/API";

export class UserEdit extends Component {
  state = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    errors: null
  };

  componentDidMount() {
    if (this.props.isAuthenticated === false) {
      this.props.history.push("/");
    } else {
      if (this.props.user) {
        const { email, first_name, last_name } = this.props.user;
        this.setState({ email, first_name, last_name });
      }
    }
  }

  handleChange = e =>
    this.setState({
      [e.target.id]: e.target.value
    });

  handleSubmit = e => {
    e.preventDefault();
    const { email, password, first_name, last_name } = this.state;
    API.updateUser(
      { email, password, first_name, last_name },
      this.props.user.id
    ).then(user => {
      if (user.errors) {
        this.setState({ errors: user.errors });
      } else {
        this.props.updateUser(user);
      }
    });
  };

  render() {
    const { email, password, first_name, last_name, errors } = this.state;
    return (
      <>
        <Header as="h1">Edit Details Below</Header>
        {errors ? (
          <Message negative>
            <ul>
              {errors.map(error => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </Message>
        ) : null}
        <Form
          onSubmit={this.handleSubmit}
          loading={this.props.user ? false : true}
        >
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

          <Header as="h3">Enter Your Password to Confirm Changes</Header>

          <Form.Input
            label={"Password"}
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            onChange={this.handleChange}
          />

          <Button type="submit">Submit</Button>
          <Button
            as={Link}
            to={`/users/${this.props.user ? this.props.user.id : ""}`}
          >
            Back
          </Button>
        </Form>
      </>
    );
  }
}

export default UserEdit;
