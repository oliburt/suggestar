import React, { Component } from "react";
import { Form, Button, Message, Header } from "semantic-ui-react";
import API from "../../adapters/API";
import FormWrapper from "../FormWrapper";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errors: null
  };

  componentDidMount() {
    if (this.props.activeHomeMenuItem !== 'Listings') {
      this.props.setActiveHomeMenuItem('Listings')
    }
    if (this.props.activeListingMenuItem !== 'Details') {
      this.props.setActiveListingMenuItem('Details')
    }
    if (this.props.activeVenueMenuItem !== 'About') {
      this.props.setActiveVenueMenuItem('About')
    }
    if (this.props.activeUserMenuItem !== 'My Venues') {
      this.props.setActiveUserMenuItem('My Venues')
    }
    if (this.props.selectedListingId) {
      this.props.setSelectedListingId(null)
    }
  }

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

      if (user && user.errors) {
        this.setState({ errors: [...user.errors] });
      } else if (user && user.error) {
        this.setState({ errors: [user.error] });
      } else if (user && user.id) {
        this.props.login(user);
      } else {
        this.setState({ errors: ["Something went wrong"] });
      }
    });
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <FormWrapper windowWidth={this.props.windowWidth}>
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
          <Button primary type="submit">Login</Button>
          <Button secondary onClick={() => this.props.history.push('/')} type="button">Cancel</Button>
        </Form>
      </FormWrapper>
    );
  }
}

export default Login;
