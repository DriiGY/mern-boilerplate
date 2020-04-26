import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userAction";

class NavBar extends Component {
  onLogoutButton = (event) => {
    event.preventDefault();

    this.props.dispatch(logoutUser()).then((response) => {
      // console.log(response);
      if (response.status === 200) {
        this.props.history.push("/login");
      } else {
        //alert("Log out failed!");
      }
    });
  };
  render() {
    //console.log(this.props.user);
    const menuLogs =
      (this.props.user.userData && !this.props.user.userData.isAuth) ||
      this.props.user.logoutSucess ? (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <a href="sass.html">Sass</a>
          </li>
          <li>
            <a href="/login">Sign In</a>
          </li>
          <li>
            <a href="/register">Sign Up</a>
          </li>
        </ul>
      ) : (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <form onSubmit={this.onLogoutButton}>
              <button type="submit" onSubmit={this.onLogoutButton}>
                Logout
              </button>
            </form>
          </li>
        </ul>
      );

    return (
      <div>
        <nav>
          <div className="nav-wrapper teal lighten-1">
            <a href="#" className="brand-logo">
              Logo
            </a>
            {menuLogs}
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(NavBar);
