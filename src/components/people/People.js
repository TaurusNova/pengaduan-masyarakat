import React, { Fragment, useState, useEffect } from "react";
import Footer from "../public/Footer";
import AllComplaints from "./AllComplaints";
import HeaderUser from "./HeaderUser";
import ProcessedComplaints from "./ProcessedComplaints";
import CompletedComplaints from "./CompletedComplaints";
import { useParams } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/outline";
import axios from "axios";
import { css } from "@emotion/react";
import BeatLoader from "react-spinners/BeatLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const People = (props) => {
  const [tabTitle, setTabTitle] = useState("semua");
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    nama: "",
    nik: "",
    telepon: "",
  });

  const [input, setInput] = useState({
    nama: "",
    username: "",
    telepon: "",
  });

  let { username } = useParams();

  const CancelToken = axios.CancelToken;
  let cancel;

  const getData = () => {
    axios
      .get(
        `/api/people_profile/${username}`,
        {
          cancelToken: new CancelToken(function executor(c) {
            cancel = c;
          }),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setData({ nama: res.data.nama, nik: res.data.nik, telp: res.data.telp });
      })
      .catch((err) => console.log(err));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    let state = {
      nama: input.nama,
      username: input.username,
      telp: input.telp,
    };
    axios
      .post(`/api/update_people/${data.nik}`, JSON.stringify(state), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        let userData = {
          nik: res.data.nik,
          username: input.username,
          level: "user",
        };
        let appState = {
          isLoggedIn: true,
          user: userData,
        };
        console.log(appState);
        localStorage.setItem("appState", JSON.stringify(appState));
        props.history.push(`/profile/${res.data.username}`);
        setIsLoading(false);
        setIsEdit(false);
      })
      .catch((err) => {
        console.log(err.response);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getData();
    return () => {
      cancel();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <HeaderUser userdata={{ nik: data.nik, username: username }} {...props} />
      <div className="relative p-4 md:p-12 flex flex-col md:flex-row md:space-x-4">
        <div className="flex flex-row md:flex-col bg-white p-4 md:justify-around rounded-md shadow-md space-x-4 md:space-x-0 items-center md:items-center md:h-96">
          <div className="h-32 w-32 md:h-48 md:w-48 p-8 border border-gray-100 shadow-md bg-white rounded-md">
            <UserCircleIcon />
          </div>
          <div className="space-y-2 text-sm">
            {isEdit ? (
              isLoading ? (
                <div className="flex justify-center items-center">
                  <BeatLoader css={override} size={50} color={"#E23E57"} loading={isLoading} speedMultiplier={1} />
                </div>
              ) : (
                <form
                  method="POST"
                  className="py-2 space-y-2 mt-2 w-11/12 flex flex-col items-center"
                  onSubmit={handleSubmit}>
                  <div className="flex space-x-1 items-center">
                    <label className="flex">Nama : </label>
                    <input
                      className="w-full flex flex-1 focus:outline-none focus:ring-primary ring-1 ring-gray-400 p-1"
                      name="nama"
                      value={input.nama}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex space-x-1 items-center">
                    <label className="flex">Username : </label>
                    <input
                      className="w-full flex flex-1 focus:outline-none focus:ring-primary ring-1 ring-gray-400 p-1"
                      name="username"
                      value={input.username}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex space-x-1 items-center">
                    <p>NIK : {data.nik}</p>
                  </div>
                  <div className="flex space-x-1 items-center">
                    <label className="flex">Telepon : </label>
                    <input
                      className="w-full flex flex-1 focus:outline-none focus:ring-primary ring-1 ring-gray-400 p-1"
                      name="telp"
                      value={input.telp}
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    type="submit"
                    className={`shadow-sm w-full text-center p-1 text-white rounded-md border border-gray-100 focus:outline-none bg-primary hover:text-white transition`}>
                    Simpan
                  </button>
                </form>
              )
            ) : (
              <>
                <p>Nama : {data.nama}</p>
                <p>Username : {username}</p>
                <p>NIK : {data.nik}</p>
                <p>Telepon : {data.telp}</p>
              </>
            )}

            <button className="md:hidden">Edit Profil</button>
          </div>
          <div className="hidden md:block text-sm w-full">
            <button
              onClick={() => {
                setIsEdit(true);
                setInput({ nama: data.nama, username: username, nik: data.nik, telp: data.telp });
              }}
              className={`${
                isEdit ? "hidden" : ""
              } shadow-sm w-full text-center p-1 rounded-md border border-gray-100 focus:outline-none hover:bg-primary hover:text-white transition`}>
              Edit Profil
            </button>
          </div>
        </div>
        <div className="flex flex-col space-y-4 mt-8 md:mt-0 w-full px-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setTabTitle("semua")}
              className={`tab-button ${tabTitle === "semua" ? "tab-button-active" : ""}`}>
              Semua Laporan
            </button>
            <button
              onClick={() => setTabTitle("proses")}
              className={`tab-button ${tabTitle === "proses" ? "tab-button-active" : ""}`}>
              Laporan di proses
            </button>
            <button
              onClick={() => setTabTitle("selesai")}
              className={`tab-button ${tabTitle === "selesai" ? "tab-button-active" : ""}`}>
              Laporan Selesai
            </button>
          </div>
          {data.nik !== "" ? (
            tabTitle === "semua" ? (
              <AllComplaints nik={data.nik} {...props} />
            ) : tabTitle === "proses" ? (
              <ProcessedComplaints nik={data.nik} {...props} />
            ) : (
              <CompletedComplaints nik={data.nik} {...props} />
            )
          ) : null}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default People;
