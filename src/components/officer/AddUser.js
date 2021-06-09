import React, { useEffect, useState } from "react";
import axios from "axios";

const AddUser = () => {
  let [input, setInput] = useState({
    nik: "",
    nama: "",
    username: "",
    password: "",
    confirmPassword: "",
    telp: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // const CancelToken = axios.CancelToken;
  // let cancel;

  // const handleError = (res) => {
  //   if (!res.ok) {
  //     if (res.status === 400) {
  //       console.log(res.status);
  //     }
  //     return res;
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let state = {
      nik: input.nik,
      nama: input.nama,
      username: input.username,
      password: input.password,
      confirmPassword: input.confirmPassword,
      telp: input.telp,
    };
    axios
      .post(
        "/api/auth/register",
        JSON.stringify(state),
        // {
        //   cancelToken: new CancelToken(function executor(c) {
        //     cancel = c;
        //   }),
        // },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      // .then(handleError)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setIsLoading(false);
          setInput({ nik: "", nama: "", username: "", password: "", confirmPassword: "", telp: "" });
          window.alert("Berhasil Create User");
        }
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err.response.data.message === "The given data was invalid.") {
          window.alert("Mohon Periksa Kembali Data Anda");
          setIsLoading(false);
        }
      });
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInput((prevalue) => {
      return {
        ...prevalue,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    // return () => {
    //   cancel();
    // };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="space-y-4 text-sm">
      <div>
        <h5 className="text-gray-600 text-sm">Halaman</h5>
        <h5 className="text-2xl">Tambah User</h5>
      </div>
      <div className="relative border border-gray-100 shadow-md py-10 px-12 bg-white rounded-md">
        {isLoading ? (
          <div className="absolute bg-gray-300 py-10 z-50 left-0 right-0 top-0 bottom-0 opacity-70">
            <div className="flex h-full justify-center items-center text-lg">Loading...</div>
          </div>
        ) : null}
        <div className="flex justify-center mb-4 text-xl ">Tambahkan User</div>
        <form className="flex-col flex space-y-6" onSubmit={handleSubmit}>
          <div className="text-field">
            <label>NIK</label>
            <input className="text-field-input" name="nik" type="text" onChange={handleChange} value={input.nik} />
          </div>
          <div className="text-field">
            <label>Nama Lengkap</label>
            <input className="text-field-input" name="nama" type="text" onChange={handleChange} value={input.nama} />
          </div>
          <div className="text-field">
            <label>Username</label>
            <input
              className="text-field-input"
              name="username"
              type="text"
              onChange={handleChange}
              value={input.username}
            />
          </div>
          <div className="text-field">
            <label>Password</label>
            <input
              className="text-field-input"
              name="password"
              type="password"
              onChange={handleChange}
              value={input.password}
            />
          </div>
          <div className="text-field">
            <label>Konfirmasi Password</label>
            <input
              className="text-field-input"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={input.confirmPassword}
            />
          </div>
          <div className="text-field">
            <label>No. Telp</label>
            <input className="text-field-input" name="telp" type="text" onChange={handleChange} value={input.telp} />
          </div>
          <button className="bg-primary py-2 text-white rounded-md" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
