import React, { Component } from "react";
import { Form, Button, Message, Header } from "semantic-ui-react";
import API from "../../adapters/API";
import FormWrapper from "../FormWrapper";
import "../../styles/FormValidations.css";

export class Registration extends Component {
  state = {
    email: "",
    password: "",
    password_confirmation: "",
    passwordMatch: null,
    first_name: "",
    last_name: "",
    emailMatch: null,
    registrationErrors: null
  };

  componentDidMount() {
    if (this.props.activeHomeMenuItem !== "Listings") {
      this.props.setActiveHomeMenuItem("Listings");
    }
    if (this.props.activeListingMenuItem !== "Details") {
      this.props.setActiveListingMenuItem("Details");
    }
    if (this.props.activeVenueMenuItem !== "About") {
      this.props.setActiveVenueMenuItem("About");
    }
    if (this.props.activeUserMenuItem !== "My Venues") {
      this.props.setActiveUserMenuItem("My Venues");
    }
    if (this.props.selectedListingId) {
      this.props.setSelectedListingId(null);
    }
  }

  handleChange = e => {
    
    // if (e.target.id === "password") {
    //   if (this.state.password === this.state.password_confirmation) {
    //     this.setState({ passwordMatch: true });
    //   }
    // }
    if (e.target.id === "email") {
      if (
        e.target.value.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      ) {
        this.setState({ emailMatch: true });
      } else {
        this.setState({ emailMatch: false });
      }
    }
    if (e.target.id === "password_confirmation") {
      if (this.state.password === e.target.value) {
        this.setState({ passwordMatch: true });
      } else {
        this.setState({ passwordMatch: false });
      }
    }
    if (e.target.id === "password") {
      if (this.state.password_confirmation === e.target.value) {
        this.setState({ passwordMatch: true });
      } else {
        this.setState({ passwordMatch: false });
      }
    }

    this.setState({
      [e.target.id]: e.target.value
    })

  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      emailMatch,
      passwordMatch
    } = this.state;
    
    if (
      emailMatch &&
      passwordMatch &&
      first_name.length > 0 &&
      last_name.length > 0 &&
      password.length >= 8
    ) {
      API.register({
        email,
        password,
        password_confirmation,
        first_name,
        last_name
      }).then(user => {
        if (user && user.errors) {
          this.setState({ registrationErrors: [...user.errors] });
        } else if (user && user.error) {
          this.setState({ registrationErrors: [user.error] });
        } else if (user && user.id) {
          this.props.login(user);
        } else {
          this.setState({ registrationErrors: ["Something went wrong"] });
        }
      });
    } else {
      const emailError = !emailMatch ? "Please provide a valid email" : null;
      const firstNameError = !first_name ? "Please provide a first name" : null;
      const lastNameError = !last_name ? "Please provide a last name" : null;
      const passwordsMatchError =
        password_confirmation !== password ? "Passwords must match" : null;
      const passwordLengthError =
        password.length < 8
          ? "Passwords must be longer than 8 characters"
          : null;
      const errors = [
        emailError,
        firstNameError,
        lastNameError,
        passwordsMatchError,
        passwordLengthError
      ];
      const nonNullErrors = errors.filter(e => e);
      this.setState({ registrationErrors: nonNullErrors });
    }
  };

  render() {
    const {
      email,
      password,
      password_confirmation,
      first_name,
      last_name,
      registrationErrors,
      passwordMatch,
      emailMatch
    } = this.state;
    return (
      <FormWrapper windowWidth={this.props.windowWidth}>
        <Header as="h1">Register</Header>
        {registrationErrors ? (
          <Message negative>
            {registrationErrors.map(error => (
              <p key={error}>{error}</p>
            ))}
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
            className={emailMatch === false ? "nomatch" : (emailMatch === true ? 'match' : null)}
            type="email"
            id="email"
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            label={"Password"}
            placeholder="Password"
            className={passwordMatch === false ? 'nomatch' : (passwordMatch === true ? 'match' : null)}
            type="password"
            value={password}
            id="password"
            onChange={this.handleChange}
          />
          <Form.Input
            label={"Password Confirmation"}
            placeholder="Password Confirmation"
            className={passwordMatch === false ? 'nomatch' : (passwordMatch === true ? 'match' : null)}
            type="password"
            value={password_confirmation}
            id="password_confirmation"
            onChange={this.handleChange}
          />
          <Button primary type="submit">
            Submit
          </Button>
          <Button
            secondary
            type="button"
            onClick={() => this.props.history.push("/")}
          >
            Cancel
          </Button>
        </Form>
      </FormWrapper>
    );
  }
}

export default Registration;
