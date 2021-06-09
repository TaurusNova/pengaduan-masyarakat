import React, { Component } from "react";

class TablePrintComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <table className="border border-gray-400 shadow-lg mx-auto max-w-full w-full whitespace-nowrap rounded-lg bg-white divide-y divide-gray-300 overflow-hidden">
          <thead className="bg-gray-50">
            <tr className="text-gray-600 text-left">
              <th className="text-sm uppercase py-3 px-1 text-center">No</th>
              <th className="text-sm uppercase">Judul</th>
              <th className="text-sm uppercase ">Isi</th>
              <th className="text-sm uppercase">Status</th>
              <th className="text-sm uppercase ">Tanggal Kejadian</th>
              <th className="text-sm uppercase ">Tanggal Laporan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 text-sm">
            {this.props.listData.map((item, index) => (
              <tr key={index}>
                <td className="text-center py-4">{index + 1}</td>
                <td className="">
                  <div className="w-36 overflow-hidden overflow-ellipsis">{item.judul_laporan}</div>
                </td>
                <td className="">
                  <div className="w-64 overflow-hidden overflow-ellipsis">{item.isi_laporan}</div>
                </td>
                <td className="">
                  <span
                    className={`${
                      item.status === "0"
                        ? "text-white bg-dark"
                        : item.status === "proses"
                        ? "text-dark bg-yellow-300"
                        : item.status === "selesai"
                        ? "text-green-800 bg-green-300"
                        : item.status === "tolak"
                        ? "bg-primary text-white"
                        : ""
                    } text-sm px-2 py-1 rounded-full`}>
                    {item.status === "0" ? "Belum Diverifikasi" : item.status}
                  </span>
                </td>
                <td className="">{item.tanggal_kejadian === null ? "Tidak Ada" : item.tanggal_kejadian}</td>
                <td className="">{item.tanggal_laporan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default TablePrintComponent;
