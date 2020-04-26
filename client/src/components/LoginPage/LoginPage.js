import React, { Component } from "react";
import "./styles/loginpage.css";
import { connect } from "react-redux";
import { loginUser } from "../../actions/userAction";
class LoginPage extends Component {
  state = {
    email: "",
    password: "",
    formErrors: { email: "", password: "" },
    emailValid: false,
    passwordValid: false,
    formValid: false,
    messageError: "",
  };

  handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  onSubmitForm = (evt) => {
    evt.preventDefault();

    const userToSubmit = {
      email: this.state.email,
      password: this.state.password,
    };

    this.setState({
      email: "",
      password: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
    });

    this.props.dispatch(loginUser(userToSubmit)).then((response) => {
      if (response.payload.loginSucess) {
        this.setState({ messageError: "" });
        this.props.history.push("/");
      } else {
        this.setState({
          messageError: "Failed to log in, Check your account credentials",
        });
      }
    });
  };

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
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
        emailValid: emailValid,
        passwordValid: passwordValid,
      },
      this.validateForm
    );
  };

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid,
    }); //if both true formValid is true
  }

  render() {
    return (
      <div id="login">
        <div id="login-page" className="row">
          <div
            className="col s12 z-depth-5 card-panel "
            style={{ padding: "0 20px" }}
          >
            <form className="login-form " onSubmit={this.onSubmitForm}>
              <div className="row"></div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">mail_outline</i>
                  <input
                    className="validate"
                    id="email"
                    type="email"
                    value={this.state.email}
                    name="email"
                    onChange={this.handleChange}
                  />
                  <label
                    htmlFor="email"
                    data-error="wrong"
                    data-success="right"
                  >
                    Email
                  </label>
                  <div className="red-text">{this.state.formErrors.email}</div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <i className="material-icons prefix">lock_outline</i>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <label
                    htmlFor="password"
                    data-error="wrong"
                    data-success="right"
                  >
                    Password
                  </label>
                  <div className="red-text">
                    {this.state.formErrors.password}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s12 m12 l12  login-text">
                  <p>
                    <label>
                      <input type="checkbox" />
                      <span>Remember me</span>
                    </label>
                  </p>
                </div>
              </div>
              <div>
                <div className="red-text">{this.state.messageError}</div>
              </div>
              <div className="row">
                <div className="input-field col s12">
                  <button
                    type="submit"
                    onSubmit={this.onSubmitForm}
                    className="btn waves-effect waves-light col s12"
                    disabled={!this.state.formValid}
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6 m6 l6">
                  <p className="margin medium-small">
                    <a href="/register">Register Now!</a>
                  </p>
                </div>
                <div className="input-field col s6 m6 l6">
                  <p className="margin right-align medium-small">
                    <a href="#">Forgot password?</a>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(LoginPage);
