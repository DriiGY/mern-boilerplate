import React, { Component } from "react";
import "./styles/register.css";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import { connect } from "react-redux";
import { registerUser } from "../../actions/userAction";

class Register extends Component {
  state = {
    restaurantCheck: false,
    costumerCheck: false,
    name: "",
    lastname: "",
    email: "",
    password: "",
    checks: 0,
    formErrors: { name: "", lastname: "", email: "", password: "" },

    nameValid: false,
    lastnameValid: false,
    emailValid: false,
    passwordValid: false,
    formValid: false,
    messageError: "",
  };
  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value }, this.validateField(name, value));
  };
  handleChangeChecked = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
    if (this.state.restaurantCheck) {
      this.setState({
        costumerCheck: false,
      });
    } else if (this.state.costumerCheck) {
      this.setState({ restaurantCheck: false });
    }
  };

  onSubmitForm = (event) => {
    event.preventDefault();
    let userType = null;
    if (!this.state.restaurantCheck && !this.state.costumerCheck) {
      userType = 0;
    } else if (this.state.restaurantCheck) {
      userType = 1;
    } else if (this.state.costumerCheck) {
      userType = 0;
    }

    const newUser = {
      name: this.state.name,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      userType: userType,
    };

    this.setState({
      name: "",
      lastname: "",
      email: "",
      password: "",
      nameValid: false,
      lastnameValid: false,
      emailValid: false,
      passwordValid: false,
    });

    this.props.dispatch(registerUser(newUser)).then((response) => {
      if (response.payload.registerSucess) {
        this.setState({ messageError: "" });
        this.props.history.push("/login");
      } else {
        this.setState({
          messageError: "Failed to Register, Check your account credentials",
        });
      }
    });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let lastnameValid = this.state.lastnameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "name":
        nameValid = value.match(/^[a-z ,.'-]+$/i);
        fieldValidationErrors.name = nameValid ? "" : "Invalid Name";
        break;
      case "lastname":
        lastnameValid = value.match(/^[a-z ,.'-]+$/i);
        fieldValidationErrors.lastname = lastnameValid
          ? ""
          : "Invalid Last Name";
        break;
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : "Invalid Email";
        break;
      case "password":
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid
          ? ""
          : "Invalid Password";
        break;
      default:
        break;
    }

    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid: nameValid,
        lastnameValid: lastnameValid,
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateFormText
    );
  };

  validateFormText() {
    this.setState({
      formValid:
        this.state.nameValid &&
        this.state.lastnameValid &&
        this.state.emailValid &&
        this.state.passwordValid,
    }); //if all true form is valide
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form className="col s12" id="reg-form" onSubmit={this.onSubmitForm}>
            <div className="row">
              <div className="input-field col s6">
                <input
                  id="first_name"
                  type="text"
                  className="validate"
                  name="name"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="first_name">First Name</label>
              </div>

              <div className="input-field col s6">
                <input
                  id="last_name"
                  type="text"
                  className="validate"
                  onChange={this.handleChange}
                  name="lastname"
                  required
                />
                <label htmlFor="last_name">Last Name</label>
              </div>
              <div className="red-text">{this.state.formErrors.name}</div>
              <div className="red-text">{this.state.formErrors.lastname}</div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="email"
                  type="email"
                  className="validate"
                  name="email"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="red-text">{this.state.formErrors.email}</div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="password"
                  type="password"
                  className="validate"
                  minLength="6"
                  name="password"
                  onChange={this.handleChange}
                  required
                />
                <label htmlFor="password">Password</label>
              </div>
              <div className="red-text">{this.state.formErrors.passowrd}</div>
            </div>

            <div className="row">
              <div className="input-field col s6">
                <div className="typeBoxes">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.restaurantCheck}
                        onChange={this.handleChangeChecked}
                        name="restaurantCheck"
                      />
                    }
                    label="Restaurant"
                  />
                </div>
                <div className="typeBoxes">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.costumerCheck}
                        onChange={this.handleChangeChecked}
                        name="costumerCheck"
                      />
                    }
                    label="Costumer"
                  />
                </div>
                <div className="grey-text">Default: Costumer</div>
              </div>
              <div className="input-field col s6">
                <button
                  className="btn btn-large btn-register waves-effect waves-light"
                  type="submit"
                  name="action"
                  onSubmit={this.onSubmitForm}
                  disabled={!this.state.formValid}
                >
                  Register
                  <i className="material-icons right">done</i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <a
          title="Login"
          className="ngl btn-floating btn-large waves-effect waves-light grey darken-4"
          href="/login"
        >
          <i className="material-icons">input</i>
        </a>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Register);
