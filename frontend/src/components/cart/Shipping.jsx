import React, { useEffect, useState } from "react";
import { countries} from 'countries-list'
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";

const Shipping = () => {
    const {shippingInfo} = useSelector((state) => state.cart);
    const countryList = Object.values(countries)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        if(shippingInfo){
            setAddress(shippingInfo?.address);
            setCity(shippingInfo?.city);
            setCountry(shippingInfo?.country);
            setPhoneNo(shippingInfo?.phoneNo);
            setZipCode(shippingInfo?.zipCode)
        }
    },[shippingInfo])

    const handleShipping = async (e) => {
        e.preventDefault();
        if(!address || !city  || !zipCode || !phoneNo || !country){
            return toast.error("All Fields are requried for Shipping")
        }
        await dispatch(saveShippingInfo({address, city, phoneNo,zipCode, country }));
        navigate("/confirm_order");
    }

  return (
    <>
    <MetaData title={"Shipping Info"}/>
      <div className="row wrapper mb-5">
        <div className="col-10 col-lg-5">
          <form className="shadow rounded bg-body" onSubmit={handleShipping}>
            <h2 className="mb-4">Shipping Info</h2>
            <div className="mb-3">
              <label htmlFor="address_field" className="form-label">
                Address
              </label>
              <input
                type="text"
                id="address_field"
                className="form-control"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city_field" className="form-label">
                City
              </label>
              <input
                type="text"
                id="city_field"
                className="form-control"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="phone_field" className="form-label">
                Phone No
              </label>
              <input
                type="tel"
                id="phone_field"
                className="form-control"
                name="phoneNo"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code_field" className="form-label">
                Zip Code
              </label>
              <input
                type="number"
                id="postal_code_field"
                className="form-control"
                name="postalCode"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="country_field" className="form-label">
                Country
              </label>
              <select
                id="country_field"
                className="form-select"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryList?.map((country) => (
                    <option key={country?.name} value={country?.name}>{country?.name}</option>
                ))}
              </select>
            </div>

            <button id="shipping_btn" type="submit" className="btn w-100 py-2">
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
