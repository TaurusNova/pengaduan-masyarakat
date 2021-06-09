import React, { useEffect, useState } from "react";
import axios from "axios";

const UnverifiedComplaints = (props) => {
  const [listComplaints, setListComplaints] = useState([]);

  const CancelToken = axios.CancelToken;
  let cancel;

  const getList = () => {
    console.log(props.nik);
    axios
      .get(
        `/api/people/complaints/${props.nik}`,
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
        setListComplaints(res.data.data);
        console.log(res.data);
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
    <div>
      <h5>Semua</h5>
      <div className="">
        <input type="text" className="text-field-search" placeholder="Cari Laporan..." />
      </div>
      {listComplaints.length > 0 ? (
        listComplaints.map((item, index) => (
          <div key={index} className="">
            <h5>Nama : {item.isi_laporan}</h5>
            <h5>Username : {item.judul_laporan}</h5>
            <h5>Telp : {item.tipe}</h5>
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UnverifiedComplaints;
