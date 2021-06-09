import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../public/Footer";
import { RadioGroup, Menu, Transition } from "@headlessui/react";
import { LogoutIcon, CheckIcon, CalendarIcon } from "@heroicons/react/outline";
import axios from "axios";
import TextareaAutosize from "react-textarea-autosize";
import Select from "react-select";
import Calendar from "react-calendar";

const jenis = ["PENGADUAN", "KRITIK & SARAN", "PERTANYAAN"];

const logout = (props) => {
  const appState = {
    isLoggedIn: false,
    user: {},
  };
  localStorage.setItem("appState", JSON.stringify(appState));
  props.history.push("/");
};

const DetailComplaintUser = (props) => {
  const [optionsProvince, setOptionsProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [optionsCity, setOptionsCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [optionsResidence, setOptionsResidence] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState("");
  const [jenisLaporan, setJenisLaporan] = useState(jenis[0]);
  const [dateValue, setDateValue] = useState(new Date());
  const [inputDateValue, setInputDateValue] = useState("");
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  let [input, setInput] = useState({
    judul: "",
    isi_laporan: "",
  });
  let { id } = useParams();
  const [data, setData] = useState(null);
  const CancelToken = axios.CancelToken;
  let cancel;

  let province = [];
  let city = [];
  let residence = [];

  const initialProvince = () => {
    axios
      .get("https://dev.farizdotid.com/api/daerahindonesia/provinsi")
      .then((res) => {
        res.data.provinsi.forEach((item, index) => {
          province.push({ index: index, id: item.id, value: item.nama, label: item.nama });
        });
        setOptionsProvince(province);
      })
      .catch((err) => window.alert(err));
  };

  const initialCity = (id) => {
    axios
      .get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${id}`)
      .then((res) => {
        res.data.kota_kabupaten.forEach((item, index) => {
          city.push({ index: index, id: item.id, value: item.nama, label: item.nama });
        });
        setOptionsCity(city);
      })
      .catch((err) => window.alert(err));
  };

  const initialResidence = (id) => {
    axios
      .get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${id}`)
      .then((res) => {
        res.data.kecamatan.forEach((item, index) => {
          residence.push({ index: index, value: item.nama, label: item.nama });
        });
        setOptionsResidence(residence);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // let data = new FormData();
    // data.append("nik", props.userdata.nik);
    // data.append("tipe", jenisLaporan);
    // data.append("judul_laporan", input.judul);
    // data.append("isi_laporan", input.isi_laporan);
    // data.append("provinsi", selectedProvince.value);
    // data.append("kota", selectedCity.value);
    // data.append("kecamatan", selectedResidence.value);
    // if (jenisLaporan === "PENGADUAN") {
    //   data.append("tanggal_kejadian", formatDateInput(dateValue));
    // } else {
    //   data.append("tanggal_kejadian", "");
    // }

    // axios
    //   .post("/api/create_complaint", data, {
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     window.alert("Laporan Berhasil Dibuat");
    //   })
    //   .catch((err) => console.log(err.response.data.errors));
  };

  const handleCalendarChange = (e) => {
    if (e instanceof Date) {
      setInputDateValue(formatDate(e));
      setDateValue(e);
      setIsCalendarShow(!isCalendarShow);
    }
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

  const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };

  const formatDateInput = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    return [year, month, day].join("-");
  };

  const getList = () => {
    axios
      .get(
        `/api/people/complaint/${id}`,
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
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getList();
    initialProvince();

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
          onClick={() => props.history.push("/profile")}>
          Kembali ke Profile
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
            <h5 className="p-2 rounded-md font-medium bg-primary text-white text-lg md:text-lg text-center">
              Sampaikan Laporan Anda
            </h5>
            <form className="flex flex-col p-2 mt-4 space-y-5" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <div className="w-full text-center text-lg mb-2">Jenis Laporan</div>
                <RadioGroup value={jenisLaporan} onChange={setJenisLaporan}>
                  <div className="flex flex-col md:flex-row md:space-x-2 justify-center md:space-y-0 space-y-2">
                    {jenis.map((jenis, index) => (
                      <div key={index} className="w-full flex-1 flex">
                        <RadioGroup.Option
                          value={jenis}
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
                                      {jenis}
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                                <div
                                  className={`flex-shrink-0  p-1 rounded-full ${
                                    checked ? "bg-white text-primary" : "text-white hover:bg-primary hover:text-primary"
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
              <div className="text-field ">
                <label className="font-medium">
                  Judul{" "}
                  {jenisLaporan === "PENGADUAN" ? (
                    "Laporan"
                  ) : jenisLaporan === "KRITIK & SARAN" ? (
                    <>Kritik / Saran</>
                  ) : (
                    <>Pertanyaan</>
                  )}
                </label>
                <input
                  name="judul"
                  onChange={handleChange}
                  value={input.judul}
                  className="text-field-input"
                  type="text"
                  placeholder={`Ketik judul ${
                    jenisLaporan === "PENGADUAN"
                      ? "laporan"
                      : jenisLaporan === "KRITIK & SARAN"
                      ? "kritik / saran"
                      : "pertanyaan"
                  } anda`}
                />
              </div>
              <div className="text-field">
                <label className="font-medium">
                  Isi{" "}
                  {jenisLaporan === "PENGADUAN" ? (
                    <>Laporan</>
                  ) : jenisLaporan === "KRITIK & SARAN" ? (
                    <>Kritik / Saran</>
                  ) : (
                    <>Pertanyaan</>
                  )}
                </label>
                <TextareaAutosize
                  name="isi_laporan"
                  onChange={handleChange}
                  value={input.isi_laporan}
                  className="text-area-input"
                  minRows={6}
                  placeholder={`Ketik ${
                    jenisLaporan === "PENGADUAN"
                      ? "laporan"
                      : jenisLaporan === "KRITIK & SARAN"
                      ? "kritik / saran"
                      : "pertanyaan"
                  } anda`}
                />
              </div>
              <Transition
                show={jenisLaporan === "PENGADUAN"}
                enter="transition-all duration-[1000ms] ease-in"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transform transition-all duration-[400ms] ease-in-out"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="text-field relative">
                  <label className="font-medium">Tanggal Kejadian</label>
                  <div className="flex">
                    <input
                      onClick={() => setIsCalendarShow(true)}
                      readOnly
                      className="flex flex-1 text-field-input"
                      type="text"
                      value={inputDateValue}
                      placeholder="Pilih tanggal kejadian"
                    />
                    <div className="flex justify-center items-center p-2 bg-gray-200 border border-gray-600">
                      <CalendarIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <Calendar
                    locale="id"
                    maxDate={new Date()}
                    className={`${isCalendarShow ? "" : "hidden"} `}
                    onChange={handleCalendarChange}
                    value={dateValue}
                  />
                </div>
              </Transition>
              <div className="text-field ">
                <label className="font-medium">
                  Provinsi {jenisLaporan === "PENGADUAN" ? <>Kejadian</> : <>Tujuan</>}
                </label>
                <Select
                  className="text-sm"
                  options={optionsProvince}
                  onChange={(value) => {
                    setSelectedCity(null);
                    setSelectedProvince(optionsProvince[value.index]);
                    initialCity(value.id);
                  }}
                  value={selectedProvince}
                  placeholder={`Pilih Provinsi ${jenisLaporan === "PENGADUAN" ? "Kejadian" : "Tujuan"}`}
                />
              </div>
              <div className="text-field">
                <label className="font-medium">
                  Kota/Kabupaten {jenisLaporan === "PENGADUAN" ? <>Kejadian</> : <>Tujuan</>}
                </label>
                <Select
                  className="text-sm"
                  isDisabled={selectedProvince ? false : true}
                  options={optionsCity}
                  onChange={(value) => {
                    setSelectedResidence(null);
                    setSelectedCity(optionsCity[value.index]);
                    initialResidence(value.id);
                  }}
                  value={selectedCity}
                  placeholder={
                    selectedProvince
                      ? `Pilih Kota/Kabupaten ${jenisLaporan === "PENGADUAN" ? "Kejadian" : "Tujuan"}`
                      : `Pilih Provinsi ${jenisLaporan === "PENGADUAN" ? "Kejadian" : "Tujuan"} terlebih dahulu`
                  }
                />
              </div>
              <div className="text-field">
                <label className="font-medium">
                  Kecamatan {jenisLaporan === "PENGADUAN" ? <>Kejadian</> : <>Tujuan</>}
                </label>
                <Select
                  className="text-sm"
                  isDisabled={selectedCity ? false : true}
                  options={optionsResidence}
                  onChange={(value) => {
                    setSelectedResidence(optionsResidence[value.index]);
                  }}
                  value={selectedResidence}
                  placeholder={
                    selectedProvince
                      ? `Pilih Kecamatan ${jenisLaporan === "PENGADUAN" ? "Kejadian" : "Tujuan"}`
                      : `Pilih Kota/Kabupaten ${jenisLaporan === "PENGADUAN" ? "Kejadian" : "Tujuan"} terlebih dahulu`
                  }
                />
              </div>
              <div className="text-field ">
                <label className="font-medium">Lampiran Foto</label>
                {data.foto !== null ? (
                  <img className="w-24 h-24" src={`/storage/foto/${data.foto}`} alt="lampiran" />
                ) : (
                  <p className="italic text-gray-600">Tidak ada Lampiran</p>
                )}
              </div>
              <button type="submit" className="bg-primary p-2 rounded-md text-white">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="min-h-screen">Loading</div>
      )}

      <Footer />
    </div>
  );
};

export default DetailComplaintUser;
