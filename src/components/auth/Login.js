import React, { Component } from "react";
import Header from "../public/Header";
import Footer from "../public/Footer";
import axios from "axios";
import loginImage from "../../assets/img/loginImage.png";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isLoading: false,
      errors: {
        auth: "",
        username: "",
        password: "",
      },
    };
  }

  componentDidMount() {
    let state = localStorage.getItem("appState");
    let AppState = JSON.parse(state);
    if (AppState) {
      if (AppState.isLoggedIn) {
        this.handleRedirectDashboard();
      }
    } else {
      const appState = {
        isLoggedIn: false,
        user: {},
      };
      localStorage.setItem("appState", JSON.stringify(appState));
    }
  }

  handleRedirectDashboard = () => {
    let state = localStorage.getItem("appState");
    let AppState = JSON.parse(state);
    let userLevel = AppState.user.level;
    if (userLevel === "admin") {
      this.props.history.push("/dashboard/admin");
      this.setState({ isLoading: false });
    } else if (userLevel === "petugas") {
      this.props.history.push("/dashboard/petugas");
      this.setState({ isLoading: false });
    } else if (userLevel === "user") {
      this.props.history.push("/");
      this.setState({ isLoading: false });
    } else {
      this.props.history.push("/register");
    }
  };

  checkLocalStorage = () => {
    let state_of_state = localStorage.getItem("appState");
    if (state_of_state) {
      let AppState = JSON.parse(state_of_state);
      if (AppState.user.level) {
        this.handleRedirectDashboard();
      }
    }
  };

  setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
    this.id = setInterval(this.checkLocalStorage, 500);
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    let state = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post("/api/auth/login", JSON.stringify(state), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.level === "user") {
          let userData = {
            nik: res.data.nik,
            username: res.data.username,
            level: res.data.level,
          };
          let appState = {
            isLoggedIn: true,
            user: userData,
          };
          this.setLocalStorage("appState", appState);
        } else {
          let userData = {
            id: res.data.id_petugas,
            username: res.data.username,
            level: res.data.level,
          };
          let appState = {
            isLoggedIn: true,
            user: userData,
          };
          this.setLocalStorage("appState", appState);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          this.setState({
            username: "",
            password: "",
            errors: { auth: "Username / password yang anda masukkan salah" },
            isLoading: false,
          });
        } else if (err.response.data.errors) {
          this.setState({
            errors: { username: err.response.data.errors.username[0], password: err.response.data.errors.password[0] },
            isLoading: false,
          });
        }
      });
  };

  changeHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUnmount() {
    clearInterval(this.id);
  }

  render() {
    const props = this.props;
    const { username, password, isLoading, errors } = this.state;
    return (
      <>
        <Header {...props} />
        {isLoading ? (
          <div className="h-screen96 flex justify-center items-center">
            <BeatLoader css={override} size={50} color={"#E23E57"} loading={isLoading} speedMultiplier={1} />
          </div>
        ) : (
          <div className="h-screen96 relative">
            <div className="flex justify-center h-screen96 w-full bg-gray-50">
              <div className="w-5/6 h-4/5 bg-white shadow-lg border border-gray-100 mt-12 rounded-md md:flex">
                <div className="flex-1 md:flex md:justify-center hidden items-center">
                  <img src={loginImage} alt="image_login" />
                </div>
                <div className="flex-1 mt-12 lg:my-auto">
                  <form method="POST" className="flex-col flex items-center space-y-5" onSubmit={this.submitHandler}>
                    {errors.auth !== "" ? <span className="text-sm text-primary">{errors.auth}</span> : null}
                    <div className="text-field w-9/12">
                      <label className="text-sm">Username</label>
                      <input
                        className="text-field-input"
                        type="text"
                        name="username"
                        onChange={this.changeHandler}
                        value={username}
                        placeholder="Username"
                      />
                      {errors.username !== "" ? <span className="text-sm text-red-700">{errors.username}</span> : null}
                    </div>
                    <div className="text-field w-9/12">
                      <label className="text-sm">Password</label>
                      <input
                        type="password"
                        className="text-field-input"
                        name="password"
                        onChange={this.changeHandler}
                        value={password}
                        placeholder="Password"
                      />
                      {errors.password !== "" ? <span className="text-sm text-red-700">{errors.password}</span> : null}
                    </div>
                    <button className="btn-primary w-9/12 h-10 text-white font-bold">MASUK</button>
                    <p className="mt-6 text-center text-base font-medium text-gray-500">
                      Belum memiliki akun?{" "}
                      <span
                        onClick={() => props.history.push("/register")}
                        className="cursor-pointer text-red-400 hover:text-red-600 transition">
                        Daftar
                      </span>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <Footer />
      </>
    );
  }
}

export default Login;
