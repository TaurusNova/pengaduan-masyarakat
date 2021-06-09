import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../public/Footer";
import { Menu, Transition } from "@headlessui/react";
import { LogoutIcon, CheckIcon, CalendarIcon } from "@heroicons/react/outline";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";

const logout = (props) => {
  const appState = {
    isLoggedIn: false,
    user: {},
  };
  localStorage.setItem("appState", JSON.stringify(appState));
  props.history.push("/");
};

const DetailComplaint = (props) => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const [dataTanggapan, setDataTanggapan] = useState([]);
  const [inputTanggapan, setInputTanggapan] = useState("");
  const [idPetugas, setIdPetugas] = useState("");

  const CancelToken = axios.CancelToken;
  let cancel;

  const getList = () => {
    axios
      .get(
        `/api/complaint/${id}`,
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
        setData(res.data.data_pengaduan[0]);
        setDataTanggapan(res.data.data_tanggapan);
        console.log(res.data.data_tanggapan);
      })
      .catch((err) => console.log(err));
  };

  const handleVerify = () => {
    axios
      .get(
        `/api/verify_complaint/${id}`,
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
        console.log(res.data);
        if (res.data.message === "Berhasil Verifikasi") {
          props.history.push("/dashboard/admin");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleReject = () => {
    axios
      .get(
        `/api/reject_complaint/${id}`,
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
        console.log(res.data);
        if (res.data.message === "Berhasil Menolak") {
          props.history.push("/dashboard/admin");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let state = {
      tanggapan: inputTanggapan,
      id_petugas: idPetugas,
    };

    axios
      .post(`/api/create_response/${id}`, JSON.stringify(state), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Berhasil menambahkan tanggapan!") {
          setInputTanggapan("");
          getList();
        }
      })
      .catch((err) => console.log(err));
  };

  const getLocalStorage = () => {
    let state_of_state = localStorage.getItem("appState");
    if (state_of_state) {
      let AppState = JSON.parse(state_of_state);

      if (AppState.user.level) {
        setIdPetugas(AppState.user.id);
      }
    }
  };

  const handleSelesai = () => {
    axios
      .post(
        `/api/complete_complaint/${id}`,
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
        console.log(res.data);
        if (res.data.message === "Berhasil Selesai") {
          props.history.push("/dashboard/admin");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getList();
    getLocalStorage();

    return () => {
      cancel();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="flex shadow-sm border-b items-center border-gray-100  py-4 px-8 bg-white">
        <h5 className="text-sm flex flex-1 text-primary">LAPORAN PENGADUAN MASYARAKAT</h5>
        <div
          className="text-sm cursor-pointer flex flex-1 justify-center"
          onClick={() => props.history.push("/dashboard/admin")}>
          Kembali ke dashboard
        </div>
        <div className="flex flex-1 justify-end ">
          <Menu as="div">
            {({ open }) => (
              <>
                <Menu.Button className="outline-none focus:outline-none bg-primary h-8 w-8 rounded-full p-4"></Menu.Button>
                <Transition
                  show={open}
                  enter="transition duration-200 ease-out"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition duration-100 ease-out"
                  leaveFrom="opacity-200"
                  leaveTo="opacity-0">
                  <Menu.Items
                    static
                    as="ul"
                    className="absolute right-8 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg focus:outline-none">
                    <div className="px-1 py-2 space-y-2">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => logout(props)}
                            className={`${
                              active ? "bg-violet-500 text-primary" : "text-gray-900"
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                            <LogoutIcon className="w-5 h-5 mr-2" aria-hidden="true" />
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
      {data !== null ? (
        <div className="flex flex-col w-full p-12 items-center bg-gray-50">
          <div className="flex flex-col mt-4 space-y-5 border border-gray-100 p-12 bg-white w-8/12 shadow-sm">
            <div>
              <div className="w-full text-center text-lg mb-2">Jenis Laporan</div>
              <div className="flex flex-col md:flex-row md:space-x-2 justify-center md:space-y-0 space-y-2">
                <div className="w-full space-x-2 flex">
                  <div
                    className={`bg-white ${
                      data.tipe === "pengaduan" ? "bg-primary text-white" : ""
                    } transition-all rounded-lg flex-1 ring-1 ring-red-700 shadow-md px-4 py-3`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p as="p" className={`font-medium `}>
                            PENGADUAN
                          </p>
                        </div>
                      </div>
                      <div className={`flex-shrink-0  p-1 rounded-full text-white`}>
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`bg-white ${
                      data.tipe === "kritik_saran" ? "bg-primary text-white" : ""
                    } transition-all rounded-lg flex-1 ring-1 ring-red-700 shadow-md px-4 py-3`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p as="p" className={`font-medium `}>
                            KRITIK & SARAN
                          </p>
                        </div>
                      </div>
                      <div className={`flex-shrink-0  p-1 rounded-full text-white`}>
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div
                    className={`bg-white ${
                      data.tipe === "pertanyaan" ? "bg-primary text-white" : ""
                    } transition-all rounded-lg flex-1 ring-1 ring-red-700 shadow-md px-4 py-3`}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <p as="p" className={`font-medium `}>
                            PERTANYAAN
                          </p>
                        </div>
                      </div>
                      <div className={`flex-shrink-0  p-1 rounded-full text-white`}>
                        <CheckIcon className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-field ">
              <label className="font-medium">
                Judul{" "}
                {data.tipe === "pengaduan" ? (
                  "Laporan"
                ) : data.tipe === "kritik_saran" ? (
                  <>Kritik / Saran</>
                ) : (
                  <>Pertanyaan</>
                )}
              </label>
              <input name="judul" value={data.judul_laporan} className="text-field-input" type="text" readOnly />
            </div>
            <div className="text-field">
              <label className="font-medium">
                Isi{" "}
                {data.tipe === "pengaduan" ? (
                  <>Laporan</>
                ) : data.tipe === "kritik_saran" ? (
                  <>Kritik / Saran</>
                ) : (
                  <>Pertanyaan</>
                )}
              </label>
              <TextareaAutosize
                name="isi_laporan"
                value={data.isi_laporan}
                className="text-area-input"
                minRows={6}
                readOnly
              />
            </div>
            <div className="text-field relative">
              <label className="font-medium">Tanggal Kejadian</label>
              <div className="flex">
                <input
                  readOnly
                  className="flex flex-1 text-field-input"
                  type="text"
                  value={data.tanggal_kejadian === null ? "" : data.tanggal_kejadian}
                  placeholder="Tidak ada tanggal kejadian."
                />
                <div className="flex justify-center items-center p-2 bg-gray-200 border border-gray-600">
                  <CalendarIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="text-field relative">
              <label className="font-medium">Tanggal Laporan</label>
              <div className="flex">
                <input
                  readOnly
                  className="flex flex-1 text-field-input"
                  type="text"
                  value={data.tanggal_laporan}
                  placeholder="Pilih tanggal kejadian"
                />
                <div className="flex justify-center items-center p-2 bg-gray-200 border border-gray-600">
                  <CalendarIcon className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="text-field ">
              <label className="font-medium">Provinsi {data.tipe === "pengaduan" ? <>Kejadian</> : <>Tujuan</>}</label>
              <input className="text-sm text-field-input" value={data.provinsi_kejadian} readOnly />
            </div>
            <div className="text-field">
              <label className="font-medium">
                Kota/Kabupaten {data.tipe === "pengaduan" ? <>Kejadian</> : <>Tujuan</>}
              </label>
              <input className="text-sm text-field-input" value={data.kota_kejadian} readOnly />
            </div>
            <div className="text-field">
              <label className="font-medium">Kecamatan {data.tipe === "pengaduan" ? <>Kejadian</> : <>Tujuan</>}</label>
              <input className="text-sm text-field-input" value={data.kecamatan_kejadian} readOnly />
            </div>
            <div className="text-field ">
              <label className="font-medium">Lampiran Foto</label>
              {data.foto !== null ? (
                <img className="w-24 h-24" src={`/storage/foto/${data.foto}`} alt="lampiran" />
              ) : (
                <p className="italic text-gray-600">Tidak ada Lampiran</p>
              )}
            </div>
          </div>
          {dataTanggapan[0]
            ? dataTanggapan.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col mt-4 space-y-5 border border-gray-100 p-8 bg-white w-8/12 shadow-sm">
                  <div>{item.tanggapan}</div>
                  <div className="text-gray-500 text-sm">Dibalas oleh : {item.nama_petugas}</div>
                </div>
              ))
            : null}
          {data.status === "0" ? (
            <div className="flex flex-col mt-4 space-y-5 border border-gray-100 p-8 bg-white w-8/12 shadow-sm">
              <div className="flex text-white space-x-2">
                <button
                  onClick={handleVerify}
                  className="flex rounded-md flex-1 p-2 bg-green-400 justify-center hover:bg-green-700 transition">
                  Verifikasi Laporan
                </button>
                <button
                  onClick={handleReject}
                  className="flex rounded-md flex-1 p-2 bg-red-400 justify-center hover:bg-red-700 transition">
                  Tolak Laporan
                </button>
              </div>
            </div>
          ) : data.status !== "tolak" && data.status !== "selesai" ? (
            <div className="flex flex-col mt-4 space-y-5 border border-gray-100 p-8 bg-white w-8/12 shadow-sm">
              <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col space-y-4">
                <div className="text-field">
                  <label>Isi Tanggapan</label>
                  <TextareaAutosize
                    name="isi_tanggapan"
                    onChange={(e) => setInputTanggapan(e.target.value)}
                    value={inputTanggapan}
                    className="text-area-input"
                    required
                    minRows={4}
                  />
                </div>
                <button className="p-2 rounded-md border bg-primary border-gray-200 shadow-sm text-white" type="submit">
                  Submit
                </button>
              </form>
              <button
                onClick={handleSelesai}
                className="p-2 rounded-md border bg-green-700 border-gray-200 shadow-sm text-white">
                Selesai
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <div className="h-screen">Loading</div>
      )}

      <Footer />
    </div>
  );
};

export default DetailComplaint;
