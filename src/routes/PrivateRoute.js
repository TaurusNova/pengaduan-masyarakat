import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";

// const PrivateRoute = ({ component: Component, path, level }) => {
//   return Auth.isLoggedIn ? (
//     AppState.user.level === level ? (
//       <Route path={path} component={Component} />
//     ) : (
//       <h1>Anda tidak memiliki akses</h1>
//     )
//   ) : (
//     <Redirect to={"/login"} />
//   );
// };

// class PrivateRoute extends Component {
// checkLocalStorage = () => {
//   let state_of_state = localStorage.getItem("appState");

//   if (state_of_state) {
//     let AppState = JSON.parse(state_of_state);
//     if (AppState.user.level) {
//       const Auth = {
//         isLoggedIn: AppState.isLoggedIn,
//         user: AppState.user,
//       };

//       console.log(Auth);

//       return Auth.isLoggedIn ? (
//         AppState.user.level === this.props.level ? (
//           <Route path={this.props.path} component={this.props.component} />
//         ) : (
//           <h1>Anda tidak memiliki akses</h1>
//         )
//       ) : (
//         this.props.history.push("/login")
//       );
//     }
//   }
// };

// componentDidMount() {
//   let state_of_state = localStorage.getItem("appState");
//   if (!state_of_state) {
//     let appState = {
//       isLoggedIn: false,
//       user: {},
//     };
//     localStorage.setItem("appState", JSON.stringify(appState));
//   }
//   this.id = setInterval(() => this.checkLocalStorage(), 500);
// }

// componentWillUnmount() {
//   clearInterval(this.id);
// }

//   render() {
//     return <div>A</div>;
//   }
// }

class PrivateRoute extends Component {
  render() {
    let state_of_state = localStorage.getItem("appState");
    if (!state_of_state) {
      let appState = {
        isLoggedIn: false,
        user: {},
      };
      localStorage.setItem("appState", JSON.stringify(appState));
    }

    let state = localStorage.getItem("appState");
    let AppState = JSON.parse(state);

    const Auth = {
      isLoggedIn: AppState.isLoggedIn,
      user: AppState,
    };
    return Auth.isLoggedIn ? (
      AppState.user.role === this.props.role ? (
        <Route path={this.props.path} component={this.props.component} />
      ) : (
        <h1>Anda tidak memiliki akses</h1>
      )
    ) : (
      this.props.history.push("/login")
    );
  }
}

export default withRouter(PrivateRoute);
