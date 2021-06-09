import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

const ListUser = (props) => {
  const [dataUser, setDataUser] = useState([]);

  const CancelToken = axios.CancelToken;
  let cancel;

  const getList = () => {
    axios
      .get(
        "/api/peoples",
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
        setDataUser(res.data.data);
        console.log(dataUser);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getList();

    return () => {
      cancel();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Fragment>
      <div>List User</div>
      {/* {dataUser.length > 0 ? (
        dataUser.map((item, index) => (
          <div key={index} className="">
            <h5>Nama : {item.nama_User}</h5>
            <h5>Username : {item.username}</h5>
            <h5>Telp : {item.telp}</h5>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )} */}
      {dataUser.length > 0 ? (
        <Fragment>
          <table className="mx-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-left">
                <th className="text-sm uppercase py-3 px-1 text-center">No</th>
                <th className="text-sm uppercase">Username</th>
                <th className="text-sm uppercase">Telp</th>
                <th className="text-sm uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {dataUser.map((item, index) => (
                <tr key={index}>
                  <td className="text-center">{index + 1}</td>
                  <td className="">
                    <p className="">{item.username}</p>
                    <p className="text-gray-500 text-sm font-semibold tracking-wide">{item.tipe}</p>
                  </td>
                  <td className="">
                    <div className="flex space-x-3">
                      <p className="">{item.telp}</p>
                    </div>
                  </td>
                  <td className="">
                    <button
                      className="text-purple-800 hover:underline"
                      onClick={() => props.history.push(`/dashboard/user/${item.id}`)}>
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      ) : dataUser.length === 0 ? (
        <div>Data Laporan Kosong</div>
      ) : (
        <div>Loading...</div>
      )}
    </Fragment>
  );
};

export default ListUser;
