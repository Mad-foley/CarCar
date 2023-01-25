import React, { useEffect, useState } from "react";

function SalesPersonForm() {
  const [autos, setAutomobiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    employee_number: "",
  });

  const [hasSignedUp, setHasSignedUp] = useState(false);

  const getData = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    } else {
      console.log("ERROR");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInputChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = `http://localhost:8090/api/salespeople/`;
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, fetchConfig);

    if (response.ok) {
      setFormData({
        name: "",
        employee_number: "",
      });
      setHasSignedUp(true);
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add Salesperson</h1>
          <form onSubmit={handleSubmit} id="create-auto-form">
            <div className="form-floating mb-3">
              <input
                onChange={handleInputChange}
                placeholder="name"
                required
                type="text"
                name="name"
                id="name"
                className="form-control"
              />
              <label htmlFor="name">Employee Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleInputChange}
                placeholder="employee_number"
                required
                type="text"
                name="employee_number"
                id="employee_number"
                className="form-control"
              />
              <label htmlFor="employee_number">Employee Number</label>
            </div>
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesPersonForm;
