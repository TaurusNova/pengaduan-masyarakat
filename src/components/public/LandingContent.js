import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import {
  AnnotationIcon,
  ChevronDoubleDownIcon,
  ClipboardCheckIcon,
  ClipboardListIcon,
  PencilIcon,
  ThumbUpIcon,
  UserCircleIcon,
  ClockIcon,
} from "@heroicons/react/outline";
import Fade from "react-reveal/Fade";
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

const LandingContent = (props) => {
  const [data, setData] = useState("");

  const CancelToken = axios.CancelToken;
  let cancel;

  const getData = () => {
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
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();

    return () => {
      cancel();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <div className="h-screen lg:h-screen p-8">
        <div className="flex w-full h-full">
          <Fade>
            <div className="flex flex-col mt-24 space-y-4">
              <h5 className="w-4/5 text-primary font-coolvetica text-4xl text-left lg:w-1/2 lg:text-5xl">
                Sampaikan Pengaduan, Kritik, Saran, maupun Pertanyaan anda dengan mudah
              </h5>
              <h5 className="w-4/5 text-gray-400 text-4xl text-left lg:w-1/2 lg:text-lg">
                Laporan anda akan diteruskan kepada pihak yang berwenang
              </h5>
              <button
                onClick={() => props.history.push("/login")}
                className="bg-primary w-36 py-2 text-white rounded-md">
                Buat Laporan
              </button>
            </div>
          </Fade>
        </div>
        <div className="animate-pulse">
          <ChevronDoubleDownIcon className="text-dark h-8 w-8 -my-44 float-right mr-5  animate-bounce lg:float-none lg:h-10 lg:w-10 lg:-my-32 lg:mx-auto" />
        </div>
      </div>
      <Fade>
        <div className="h-full flex justify-center">
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
            <div
              onClick={() => props.history.push("/login")}
              className="mt-10 rounded-md border-2 flex justify-center items-center border-primary shadow-md h-12 border-dashed cursor-pointer text-primary hover:bg-primary
                                hover:text-white transition lg">
              <p className="text-lg font-medium ">Buat Laporan</p>
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

export default LandingContent;
