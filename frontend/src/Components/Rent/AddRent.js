import React, { useState } from "react";
import axios from "axios";
import "./AddRent.css";
//import { useLocation } from "react-router-dom";

export default function AddRent() {
  const [vehicle_no, setVehicleNo] = useState("");
  const [brand, setBrand] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [milage, setMilage] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [receive_date, setReceiveDate] = useState("");
  const [return_date, setReturnDate] = useState("");
  const [owner_name, setOwnerName] = useState("");
  const [owner_phone, setOwnerPhone] = useState("");
  const [owner_email, setOwnerEmail] = useState("");
  const [rental, setRental] = useState("");

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Clear existing errors
    setErrors({});

    // Validation for vehicle_no
    if (!vehicle_no.match(/^([A-Z]{2,3}-\d{4})$/)) {
      newErrors.vehicle_no = "Invalid format (e.g., XX-0000 or XXX-0000)";
    }

    // Validation for other required fields
    if (!brand) {
      newErrors.brand = "Brand is required";
    }
    if (!vehicle_model) {
      newErrors.vehicle_model = "Vehicle Model is required";
    }
    if (!milage) {
      newErrors.milage = "Milage is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!owner_name) {
      newErrors.owner_name = "Owner Name is required";
    }
    if (!owner_phone || !owner_phone.match(/^\d{10}$/)) {
      newErrors.owner_phone = "Owner Phone must be 10 digits";
    }
    if (!owner_email || !owner_email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.owner_email = "Invalid email format";
    }

    // Validation for receive_date and return_date
const currentDate = new Date();
const currentDateString = currentDate.toISOString().split("T")[0];

if (receive_date && receive_date < currentDateString) {
  newErrors.receive_date = "Receive Date cannot be in the past";
}

if (return_date && return_date < currentDateString) {
  newErrors.return_date = "Return Date cannot be in the past";
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendData = (e) => {
    e.preventDefault();

    if (validate()) {
      const newRent = {
        vehicle_no,
        brand,
        vehicle_model,
        milage,
        capacity,
        description,
        receive_date,
        return_date,
        owner_name,
        owner_phone,
        owner_email,
        rental,
      };

      axios
        .post("http://localhost:8411/rent/add", newRent)
        .then((response) => {
          alert("Rent Successfully added");
          // Reset state variables here...
          window.location.href="/rent/allRent";
          setVehicleNo("");
          setBrand("");
          setVehicleModel("");
          setMilage("");
          setCapacity("");
          setDescription("");
          setReceiveDate("");
          setReturnDate("");
          setOwnerName("");
          setOwnerPhone("");
          setOwnerEmail("");
          setRental("");
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  const handleInputChange = (e) => {
    // Clear the error for the current input field
    const { name } = e.target;
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // Update the state with the new value
    const value = e.target.value;
    const inputName = e.target.name;
    switch (inputName) {
      case "vehicle_no":
        setVehicleNo(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "vehicle_model":
        setVehicleModel(value);
        break;
      case "milage":
        setMilage(value);
        break;
      case "capacity":
        setCapacity(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "receive_date":
        setReceiveDate(value);
        break;
      case "return_date":
        setReturnDate(value);
        break;
      case "owner_name":
        setOwnerName(value);
        break;
      case "owner_phone":
        setOwnerPhone(value);
        break;
      case "owner_email":
        setOwnerEmail(value);
        break;
      case "rental":
        setRental(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <form onSubmit={sendData}>
        <div className="form-group">
          <label htmlFor="vehicle_no">Vehicle Number</label>
          <input
            type="text"
            className="form-control"
            id="vehicle_no"
            name="vehicle_no"
            placeholder="Enter Vehicle Number Eg: LC-0000"
            value={vehicle_no}
            onChange={handleInputChange}
          />
          {errors.vehicle_no && (
            <div className="error" style={{ color: "red" }}>
              {errors.vehicle_no}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            placeholder="Enter Brand"
            value={brand}
            onChange={handleInputChange}
          />
          {errors.brand && (
            <div className="error" style={{ color: "red" }}>
              {errors.brand}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="vehicle_model">Vehicle Model</label>
          <input
            type="text"
            className="form-control"
            id="vehicle_model"
            name="vehicle_model"
            placeholder="Enter Vehicle Model"
            value={vehicle_model}
            onChange={handleInputChange}
          />
          {errors.vehicle_model && (
            <div className="error" style={{ color: "red" }}>
              {errors.vehicle_model}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="milage">Mileage</label>
          <input
            type="number"
            className="form-control"
            id="milage"
            name="milage"
            placeholder="Enter Milage"
            value={milage}
            onChange={handleInputChange}
          />
          {errors.milage && (
            <div className="error" style={{ color: "red" }}>
              {errors.milage}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="text"
            className="form-control"
            id="capacity"
            name="capacity"
            placeholder="Enter Capacity"
            value={capacity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            placeholder="Enter Description"
            value={description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <div className="error" style={{ color: "red" }}>
              {errors.description}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="receive_date">Receive Date</label>
          <input
            type="date"
            className="form-control"
            id="receive_date"
            name="receive_date"
            value={receive_date}
            onChange={handleInputChange}
          />
          {errors.receive_date && (
            <div className="error" style={{ color: "red" }}>
              {errors.receive_date}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="return_date">Return Date</label>
          <input
            type="date"
            className="form-control"
            id="return_date"
            name="return_date"
            value={return_date}
            onChange={handleInputChange}
          />
          {errors.return_date && (
            <div className="error" style={{ color: "red" }}>
              {errors.return_date}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="owner_name">Owner Name</label>
          <input
            type="text"
            className="form-control"
            id="owner_name"
            name="owner_name"
            placeholder="Enter Owner Name"
            value={owner_name}
            onChange={handleInputChange}
          />
          {errors.owner_name && (
            <div className="error" style={{ color: "red" }}>
              {errors.owner_name}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="owner_phone">Owner Phone</label>
          <input
            type="number"
            className="form-control"
            id="owner_phone"
            name="owner_phone"
            placeholder="Enter Owner Phone"
            value={owner_phone}
            onChange={handleInputChange}
          />
          {errors.owner_phone && (
            <div className="error" style={{ color: "red" }}>
              {errors.owner_phone}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="owner_email">Owner Email</label>
          <input
            type="email"
            className="form-control"
            id="owner_email"
            name="owner_email"
            placeholder="Enter Owner Email"
            value={owner_email}
            onChange={handleInputChange}
          />
          {errors.owner_email && (
            <div className="error" style={{ color: "red" }}>
              {errors.owner_email}
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="rental">Rental</label>
          <input
            type="number"
            className="form-control"
            id="rental"
            name="rental"
            placeholder="Enter Rental"
            value={rental}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
