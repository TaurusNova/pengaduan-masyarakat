import React, { useState, useRef } from "react";
import Calendar from "react-calendar";
import { CalendarIcon } from "@heroicons/react/outline";
import axios from "axios";
import TablePrintComponent from "./TablePrintComponent";
import { useReactToPrint } from "react-to-print";

const PrintDate = (props) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [listData, setListData] = useState([]);
  const [dateValue, setDateValue] = useState({
    from: new Date(),
    to: new Date(),
  });
  const [inputDateValue, setInputDateValue] = useState({
    from: "",
    to: "",
  });
  const [isCalendarShow, setIsCalendarShow] = useState({
    from: false,
    to: false,
  });

  const handleCalendarChange = (e, type) => {
    if (e instanceof Date) {
      if (type === "from") {
        console.log(e);
        setInputDateValue({ from: formatDate(e), to: inputDateValue.to });
        setIsCalendarShow({ from: !isCalendarShow.from });
        setDateValue({ from: e, to: dateValue.to });
      } else {
        setInputDateValue({ to: formatDate(e), from: inputDateValue.from });
        setIsCalendarShow({ to: !isCalendarShow.to });
        setDateValue({ to: e, from: dateValue.from });
      }
    }
  };

  const handleSearchData = () => {
    let state = {
      tanggal_dari: formatDateInput(dateValue.from),
      tanggal_sampai: formatDateInput(dateValue.to),
    };

    axios
      .post("/api/admin/report/date", JSON.stringify(state), {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setListData(res.data);
      })
      .catch((err) => console.log(err.response.data.errors));
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

  return (
    <div className="space-y-2">
      <div>
        <h5 className="text-sm text-gray-400">Overview</h5>
        <h5 className="text-dark text-xl">Cetak Periode</h5>
      </div>
      <div className="bg-white border border-gray-300 rounded-md shadow-sm p-8">
        <div className="flex space-x-8">
          <div className="text-field relative flex-1">
            <label className="font-medium">Cetak dari Tanggal</label>
            <div className="flex">
              <input
                readOnly
                onClick={() => setIsCalendarShow({ from: true })}
                className="flex flex-1 text-field-input"
                type="text"
                value={inputDateValue.from}
                placeholder="Pilih dari tanggal"
              />
              <div className="flex justify-center items-center p-2 bg-gray-200 border border-gray-600">
                <CalendarIcon className="h-5 w-5" />
              </div>
            </div>
            <Calendar
              className={`${isCalendarShow.from ? "" : "hidden"} `}
              locale="id"
              maxDate={new Date()}
              onChange={(e) => handleCalendarChange(e, "from")}
              value={dateValue.from}
            />
          </div>
          <div className="text-field relative flex-1">
            <label className="font-medium">Sampai Tanggal</label>
            <div className="flex">
              <input
                readOnly
                onClick={() => setIsCalendarShow({ to: true })}
                className="flex flex-1 text-field-input"
                type="text"
                value={inputDateValue.to}
                placeholder="Pilih tanggal kejadian"
              />
              <div className="flex justify-center items-center p-2 bg-gray-200 border border-gray-600">
                <CalendarIcon className="h-5 w-5" />
              </div>
            </div>
            <Calendar
              className={`${isCalendarShow.to ? "" : "hidden"} `}
              locale="id"
              maxDate={new Date()}
              onChange={(e) => handleCalendarChange(e, "to")}
              value={dateValue.to}
            />
          </div>
        </div>
        <div className="space-x-4">
          <button onClick={handleSearchData} className="focus:outline-none text-primary my-4">
            Cari Data
          </button>
          <button onClick={handlePrint}>Cetak Data</button>
        </div>
        <TablePrintComponent ref={componentRef} listData={listData} />
      </div>
    </div>
  );
};

export default PrintDate;
