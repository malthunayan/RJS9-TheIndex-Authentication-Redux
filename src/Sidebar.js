import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

// Logo
import logo from "./assets/theindex.svg";

import { logout } from "./redux/actions/";

class Sidebar extends Component {
  authentication = () => {
    if (!this.props.user) {
      return (
        <div className="fixed-bottom">
          <Link to="/login" className="btn btn-info m-2 float-left">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success m-2 float-left">
            Signup
          </Link>
        </div>
      );
    } else {
      return (
        <div className="fixed-bottom">
          <button
            className="btn btn-info m-2 float-left"
            onClick={this.props.logout}
          >
            Logout
          </button>
        </div>
      );
    }
  };

  render() {
    return (
      <div id="sidebar">
        <img src={logo} className="logo" alt="the index logo" />
        <section>
          <h4 className="menu-item active">
            <NavLink to="/authors">AUTHORS</NavLink>
          </h4>
        </section>
        {this.authentication()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);
