import React, { Fragment, useEffect, useState, useRef } from "react";
import {
  AnnotationIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  PencilIcon,
  ThumbUpIcon,
  UserCircleIcon,
  CheckIcon,
  CalendarIcon,
  PaperClipIcon,
  XIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import { RadioGroup, Transition } from "@headlessui/react";
import Fade from "react-reveal/Fade";
import axios from "axios";
import Select from "react-select";
import Calendar from "react-calendar";
import TextareaAutosize from "react-textarea-autosize";
import "../../assets/calendar.css";
import shapeBG from "../../assets/img/Shape.png";

const procedure = [
  {
    text: "Tulis laporan anda dengan jelas dan jangan lupa untuk menyertakan lampiran",
    icon: PencilIcon,
  },
  { text: "Laporan anda akan diverifikasi oleh petugas", icon: ClipboardCheckIcon },
  { text: "Petugas akan memproses laporan anda dan akan memberi tanggapan atas laporan anda", icon: AnnotationIcon },
  { text: "Laporan akan terus ditindaklanjuti hingga selesai", icon: ThumbUpIcon },
];

const jenis = ["PENGADUAN", "KRITIK & SARAN", "PERTANYAAN"];

const LandingUser = (props) => {
  const [optionsProvince, setOptionsProvince] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [optionsCity, setOptionsCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [optionsResidence, setOptionsResidence] = useState([]);
  const [selectedResidence, setSelectedResidence] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [jenisLaporan, setJenisLaporan] = useState(jenis[0]);
  const [dateValue, setDateValue] = useState(new Date());
  const [inputDateValue, setInputDateValue] = useState("");
  const [isCalendarShow, setIsCalendarShow] = useState(false);
  const [time, setTime] = useState("");
  const [data, setData] = useState("");
  let [input, setInput] = useState({
    judul: "",
    isi_laporan: "",
  });

  let province = [];
  let city = [];
  let residence = [];

  const hiddenFileInput = useRef(null);

  const CancelToken = axios.CancelToken;
  let cancel;

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
    let data = new FormData();
    data.append("nik", props.userdata.nik);
    data.append("tipe", jenisLaporan);
    data.append("judul_laporan", input.judul);
    data.append("isi_laporan", input.isi_laporan);
    data.append("provinsi", selectedProvince.value);
    data.append("kota", selectedCity.value);
    data.append("kecamatan", selectedResidence.value);
    if (jenisLaporan === "PENGADUAN") {
      data.append("tanggal_kejadian", formatDateInput(dateValue));
    } else {
      data.append("tanggal_kejadian", "");
    }
    if (selectedFile.length !== 0) {
      data.append("foto", selectedFile);
    }

    axios
      .post("/api/create_complaint", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        window.alert("Laporan Berhasil Dibuat");
        setInput({ judul: "", isi_laporan: "" });
        setInputDateValue("");
        setSelectedProvince(null);
        setSelectedCity(null);
        setSelectedResidence(null);
      })
      .catch((err) => console.log(err.response.data.errors));
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    setSelectedFile(e.target.files[0]);
  };

  const handleClickFile = (e) => {
    hiddenFileInput.current.click();
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

  const getData = () => {
    let current = new Date();
    let hours = current.getHours();
    if (hours >= 5 && hours < 12) {
      setTime("Pagi");
    } else if (hours >= 12 && hours < 15) {
      setTime("Siang");
    } else if (hours >= 15 && hours < 19) {
      setTime("Sore");
    } else if (hours >= 19 || hours < 5) {
      setTime("Malam");
    }
    axios
      .get(
        `/api/home/get_data`,
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
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    initialProvince();

    return () => {
      cancel();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <div className="px-8 flex flex-col">
        <div className="flex flex-col items-start mt-4 md:mt-12 pl-24">
          <p className="font-coolvetica md:text-5xl text-white">
            Selamat {time}, {props.userdata.username}
          </p>
          <p className="text-white font-coolvetica mt-3 text-2xl">Silahkan isi form berikut untuk membuat laporan</p>
        </div>
        <div className="w-full flex justify-center mt-16">
          <div className="border bg-white md:w-8/12 w-full rounded-md border-gray-200 p-6 px-8 shadow-md mt-2">
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
              <div className="flex flex-col space-y-1">
                <div className="flex items-center space-x-1">
                  <PaperClipIcon className="w-4 h-4 text-primary" />
                  <span className="text-base cursor-pointer" onClick={handleClickFile}>
                    Pilih Lampiran
                  </span>
                </div>
                {selectedFile.length !== 0 ? (
                  <div className="flex items-center">
                    <span>Lampiran : {selectedFile.name} </span>
                    <span>
                      <XIcon
                        className="w-4 h-4 cursor-pointer text-primary"
                        onClick={() => {
                          let empty = [];
                          setSelectedFile(empty);
                        }}
                      />
                    </span>
                  </div>
                ) : null}
              </div>
              <input
                ref={hiddenFileInput}
                accept="image/*"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e)}></input>
              <button type="submit" className="bg-primary p-2 rounded-md text-white">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
      <Fade>
        <div className="h-full flex justify-center mt-24">
          <div className="text-center w-3/4 lg:w-full relative mt-20 flex flex-col space-y-12 lg:px-12">
            <p className="text-primary text-4xl font-coolvetica">Alur Pengaduan</p>
            <div className="lg:flex">
              <div className="h-44 p-5 px-8 border divide-y-2 divide-red-100 border-gray-100 shadow-lg rounded-md my-2 lg:mx-2 lg:flex-1 lg:h-auto z-10">
                <UserCircleIcon className="h-8 w-8 mx-auto text-primary mt-2 mb-4" />
                <div className="h-20 justify-center items-center flex lg:h-auto lg:items-start">
                  <p className="mt-4">
                    <span className="cursor-pointer text-primary" onClick={() => props.history.push("/login")}>
                      Masuk
                    </span>{" "}
                    ke akun anda, bila belum memiliki silahkan untuk{" "}
                    <span className="cursor-pointer text-primary" onClick={() => props.history.push("/register")}>
                      daftar
                    </span>{" "}
                    terlebih dahulu
                  </p>
                </div>
              </div>
              {procedure.map((item) => (
                <div
                  key={item.text}
                  className="h-44 p-5 px-8 border divide-y-2 divide-red-100 border-gray-100 shadow-lg rounded-md my-2 lg:mx-2 lg:h-auto lg:flex-1 z-10">
                  <item.icon className="h-8 w-8 mx-auto text-primary mt-2 mb-4" />
                  <div className="h-20 justify-center items-center flex lg:h-auto lg:items-start">
                    <p className="mt-4">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Fade>
      <Fade>
        <div
          className="p-24 flex flex-col items-center mt-72 mb-12 space-y-12"
          style={{
            backgroundImage: `url(${shapeBG})`,
            backgroundSize: "100%, 100%",
          }}>
          <div className="space-y-8 pt-12 flex flex-col items-center font-coolvetica text-white">
            <p className="text-4xl">Jumlah Laporan Saat Ini</p>
            <p className="text-7xl">{data.semua}</p>
          </div>
          <div className="bg-white rounded-md flex px-12 py-6 justify-around w-4/5 shadow-lg">
            <div className="flex flex-col space-y-2 items-center flex-1">
              <ClipboardListIcon className="h-16 text-dark w-12" />
              <p className="text-xl">{data.proses}</p>
              <p>Proses</p>
            </div>
            <div className="flex flex-col space-y-2 items-center flex-1">
              <ClipboardCheckIcon className="h-16 text-dark w-12" />
              <p className="text-xl">{data.selesai}</p>
              <p>Selesai</p>
            </div>
            <div className="flex flex-col space-y-2 items-center flex-1">
              <ClockIcon className="h-16 text-dark w-12" />
              <p className="text-xl">{data.belum_diverifikasi}</p>
              <p>Belum diverifikasi</p>
            </div>
          </div>
        </div>
      </Fade>
    </Fragment>
  );
};

export default LandingUser;
