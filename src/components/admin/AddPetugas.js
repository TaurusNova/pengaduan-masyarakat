import React, { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import axios from "axios";

const level = ["petugas", "admin"];

const AddPetugas = () => {
  let [input, setInput] = useState({
    nama_petugas: "",
    username: "",
    password: "",
    telp: "",
    level: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [levelPetugas, setlevelPetugas] = useState("");

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
      nama_petugas: input.nama_petugas,
      username: input.username,
      password: input.password,
      telp: input.telp,
      level: levelPetugas,
    };
    axios
      .post(
        "/api/admin/register_petugas",
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
        }
      })
      .catch((err) => console.log(err.response));
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
        <h5 className="text-2xl">Tambah Petugas</h5>
      </div>
      <div className="relative border border-gray-100 shadow-md py-10 px-12 bg-white rounded-md">
        {isLoading ? (
          <div className="absolute bg-gray-300 py-10 z-50 left-0 right-0 top-0 bottom-0 opacity-70">
            <div className="flex h-full justify-center items-center text-lg">Loading...</div>
          </div>
        ) : null}
        <div className="flex justify-center mb-4 text-xl ">Tambahkan Petugas</div>
        <form className="flex-col flex space-y-6" onSubmit={handleSubmit}>
          <div className="text-field">
            <label>Nama Petugas</label>
            <input
              className="text-field-input"
              name="nama_petugas"
              type="text"
              onChange={handleChange}
              value={input.nama_petugas}
            />
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
            <label>No. Telp</label>
            <input className="text-field-input" name="telp" type="text" onChange={handleChange} value={input.telp} />
          </div>
          <div className="text-field">
            <label>Level</label>
            <RadioGroup value={levelPetugas} onChange={setlevelPetugas}>
              <div className="flex flex-col md:flex-row md:space-x-2 justify-center md:space-y-0 space-y-2">
                {level.map((level, index) => (
                  <div key={index} className="w-full flex-1 flex">
                    <RadioGroup.Option
                      value={level}
                      className={({ active, checked }) =>
                        `${active ? "ring-2" : ""} 
                         ${
                           checked
                             ? "bg-primary text-white"
                             : "bg-white hover:bg-primary hover:text-white transition-all"
                         }
                         rounded-lg flex-1 ring-1 ring-red-700 shadow-md px-4 py-3 cursor-pointer flex focus:outline-none`
                      }>
                      {({ checked }) => (
                        <>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center">
                              <div className="text-sm">
                                <RadioGroup.Label as="p" className={`font-medium `}>
                                  {level}
                                </RadioGroup.Label>
                              </div>
                            </div>
                            <div
                              className={`flex-shrink-0  p-1 rounded-full ${
                                checked ? "bg-red-700 text-white" : "text-white hover:bg-primary hover:text-primary"
                              }`}>
                              <CheckIcon className="w-4 h-4" />
                            </div>
                          </div>
                        </>
                      )}
                    </RadioGroup.Option>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
          <button className="bg-primary py-2 text-white rounded-md" type="submit">
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPetugas;
