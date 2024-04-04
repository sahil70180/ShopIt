import React, { useState } from "react";
import Adminlayout from "../layout/Adminlayout";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import SalesChart from "../charts/SalesChart";

const AdminDashboard = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSubmit = () => {
    console.log(new Date(startDate).toISOString());
    console.log(new Date(endDate).toISOString());
  }
  return (
    <Adminlayout>
      <div className="d-flex justify-content-start align-items-center">
        <div className="mb-3 me-4">
          <label className="form-label d-block">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label d-block">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
          />
        </div>
        <button className="btn fetch-btn ms-4 mt-3 px-5" onClick={handleSubmit}>Fetch</button>
      </div>

      <div className="row pr-4 my-5">
        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-success o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Sales
                <br />
                <b>$0.00</b>
              </div>
            </div>
          </div>
        </div>

        <div className="col-xl-6 col-sm-12 mb-3">
          <div className="card text-white bg-danger o-hidden h-100">
            <div className="card-body">
              <div className="text-center card-font-size">
                Orders
                <br />
                <b>0</b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SalesChart/>

      <div className="mb-5"></div>
    </Adminlayout>
  );
};

export default AdminDashboard;
