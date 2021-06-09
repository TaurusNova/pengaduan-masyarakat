import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/outline";

const ListPetugas = (props) => {
  const [dataPetugas, setDataPetugas] = useState([]);

  const CancelToken = axios.CancelToken;
  let cancel;

  const getList = () => {
    axios
      .get(
        "/api/officers",
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
        setDataPetugas(res.data.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteComplaint = (id) => {
    axios
      .post(
        `/api/admin/delete_officer/${id}`,
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
        console.log(res.data.data);
        getList();
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
      <div>List Petugas</div>
      {dataPetugas === null ? (
        <div>Loading...</div>
      ) : dataPetugas.length === 0 ? (
        <div>Data Petugas Kosong</div>
      ) : (
        <Fragment>
          <table className="border border-gray-400 shadow-lg mx-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="text-gray-600 text-left">
                <th className="text-sm uppercase py-3 px-1 text-center">No</th>
                <th className="text-sm uppercase">Nama</th>
                <th className="text-sm uppercase hidden md:table-cell">Username</th>
                <th className="text-sm uppercase">Telp</th>
                <th className="text-sm uppercase hidden md:table-cell">Level</th>
                <th className="text-sm uppercase hidden md:table-cell">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {dataPetugas.map((item, index) =>
                item.username !== "admin" ? (
                  <tr key={index}>
                    <td className="text-center py-4">{index}</td>
                    <td className="">
                      <div className="verflow-hidden overflow-ellipsis">{item.nama_petugas}</div>
                    </td>
                    <td className="hidden md:table-cell">
                      <div className="overflow-hidden overflow-ellipsis">{item.username}</div>
                    </td>
                    <td className="">
                      <span>{item.telp}</span>
                    </td>
                    <td className="hidden md:table-cell">{item.level}</td>
                    <td className="hidden md:table-cell">
                      <button
                        className="text-purple-800 hover:underline"
                        onClick={() => {
                          if (window.confirm("Apakah anda yakin ingin Menghapus?")) {
                            deleteComplaint(item.id_petugas);
                          }
                        }}>
                        <TrashIcon className="h-5 w-5 text-primary" />
                      </button>
                    </td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ListPetugas;
