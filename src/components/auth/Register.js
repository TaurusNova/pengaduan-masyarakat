import React, { Component } from "react";
import Header from "../public/Header";
import Footer from "../public/Footer";
import axios from "axios";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      isLoading: false,
      nik: "",
      nama: "",
      username: "",
      password: "",
      confirmPassword: "",
      telp: "",
      isAccept: false,
      isAcceptMessage: "",
      errors: {
        confirmPassword: "",
        nama: "",
        nik: "",
        password: "",
        telp: "",
        username: "",
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
    } else if (userLevel === "petugas") {
      this.props.history.push("/dashboard/petugas");
    } else if (userLevel === "user") {
      this.props.history.push("/");
    } else {
      this.props.history.push("/register");
    }
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    if (this.state.isAccept) {
      axios
        .post("/api/auth/register", JSON.stringify(this.state), {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          window.alert("Register Berhasil");
          this.setState({ isLoading: false });
          this.setState({ nik: "", nama: "", username: "", password: "", confirmPassword: "", telp: "" });
          console.log(response);
        })
        .catch((err) => {
          if (err.response.data.errors) {
            let errors = {
              confirmPassword: "",
              nama: "",
              nik: "",
              password: "",
              telp: "",
              username: "",
            };
            if (err.response.data.errors.nik) {
              errors.nik = err.response.data.errors.nik[0];
            }
            if (err.response.data.errors.nama) {
              errors.nama = err.response.data.errors.nama[0];
            }
            if (err.response.data.errors.username) {
              errors.username = err.response.data.errors.username[0];
            }
            if (err.response.data.errors.telp) {
              errors.telp = err.response.data.errors.telp[0];
            }
            if (err.response.data.errors.confirmPassword) {
              errors.confirmPassword = err.response.data.errors.confirmPassword[0];
            }
            if (err.response.data.errors.password) {
              errors.password = err.response.data.errors.password[0];
            }
            this.setState({ errors, isLoading: false, isAcceptMessage: "", isAccept: false });
          }
        });
    } else {
      this.setState({ isAcceptMessage: "Mohon untuk menyetujui terlebih dahulu", isLoading: false });
    }
  };

  changeHandler = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const props = this.props;
    const { nik, nama, username, password, telp, confirmPassword, isAccept, isAcceptMessage, errors, isLoading } =
      this.state;
    return (
      <>
        <Header {...props} />
        {isLoading ? (
          <div className="h-screen96 flex justify-center items-center">
            <BeatLoader css={override} size={50} color={"#E23E57"} loading={isLoading} speedMultiplier={1} />
          </div>
        ) : (
          <div className="relative ">
            <div className="flex-col flex justify-center items-center bg-gray-50 w-full py-12">
              <div className="w-3/5 px-12 py-14 bg-white shadow-lg border border-gray-200 rounded-md flex flex-col">
                <h5 className="text-red-500 font-coolvetica text-4xl mx-auto">DAFTAR AKUN</h5>
                <div className="flex flex-col mt-10">
                  <form method="POST" className="flex flex-col space-y-8" onSubmit={this.submitHandler}>
                    <div className="flex justify-between space-x-8">
                      <div className="text-field flex-1">
                        <label className="text-field-label">NIK</label>
                        <input
                          className="text-field-input"
                          type="text"
                          name="nik"
                          onChange={this.changeHandler}
                          value={nik}
                          placeholder="NIK"
                        />
                        {errors.nik !== "" ? <span className="text-sm text-red-700">{errors.nik}</span> : null}
                      </div>
                      <div className="text-field flex-1">
                        <label className="text-field-label">Nama Lengkap</label>
                        <input
                          className="text-field-input"
                          type="text"
                          name="nama"
                          onChange={this.changeHandler}
                          value={nama}
                          placeholder="Nama Lengkap"
                        />
                        {errors.nama !== "" ? <span className="text-sm text-red-700">{errors.nama}</span> : null}
                      </div>
                    </div>
                    <div className="flex justify-between space-x-8">
                      <div className="text-field flex-1">
                        <label className="text-field-label">Username</label>
                        <input
                          className="text-field-input"
                          type="text"
                          name="username"
                          onChange={this.changeHandler}
                          value={username}
                          placeholder="Username"
                        />
                        {errors.username !== "" ? (
                          <span className="text-sm text-red-700">{errors.username}</span>
                        ) : null}
                      </div>
                      <div className="text-field flex-1">
                        <label className="text-field-label">No. Telp</label>
                        <input
                          className="text-field-input "
                          type="text"
                          name="telp"
                          onChange={this.changeHandler}
                          value={telp}
                          placeholder="Nomor Telepon"
                        />
                        {errors.telp !== "" ? <span className="text-sm text-red-700">{errors.telp}</span> : null}
                      </div>
                    </div>
                    <div className="flex justify-between space-x-8">
                      <div className="text-field flex-1">
                        <label className="text-field-label">Password</label>
                        <input
                          className="text-field-input"
                          type="password"
                          name="password"
                          onChange={this.changeHandler}
                          value={password}
                          placeholder="Password minimal 8 karakter"
                        />
                        {errors.password !== "" ? (
                          <span className="text-sm text-red-700">{errors.password}</span>
                        ) : null}
                      </div>
                      <div className="text-field flex-1">
                        <label className="text-field-label">Konfirmasi Password</label>
                        <input
                          className="text-field-input"
                          type="password"
                          name="confirmPassword"
                          onChange={this.changeHandler}
                          value={confirmPassword}
                          placeholder="Password minimal 8 karakter"
                        />
                        {errors.confirmPassword !== "" ? (
                          <span className="text-sm text-red-700">{errors.confirmPassword}</span>
                        ) : null}
                      </div>
                    </div>
                    <div className="space-y-2 flex flex-col text-sm">
                      <div className="flex items-center space-x-2">
                        <input
                          className="cursor-pointer w-4 h-4"
                          type="checkbox"
                          name="tos"
                          onChange={() => this.setState({ isAccept: !isAccept })}
                          value={isAccept}></input>
                        <label className="font-medium text-gray-700 text-sm">
                          Saya telah membaca dan menyetujui Syarat dan Ketentuan Layanan
                        </label>
                      </div>
                      {isAcceptMessage !== "" ? (
                        <span className="text-primary">{isAcceptMessage}</span>
                      ) : (
                        <span className="hidden" aria-hidden="true"></span>
                      )}
                    </div>
                    <button className="btn-primary w-full h-10 text-white">DAFTAR</button>
                    <p className="mt-6 text-center text-sm font-medium text-gray-500">
                      Sudah? memiliki akun?{" "}
                      <span
                        onClick={() => props.history.push("/login")}
                        className="cursor-pointer text-red-400 hover:text-red-600 transition">
                        Masuk
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

export default Register;
