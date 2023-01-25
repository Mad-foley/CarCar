import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ModelForm() {
    const [manufacturers, setManufacturers] = useState([]);
  const fetchData = async () => {
      const url = 'http://localhost:8100/api/manufacturers/';

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers)
      } else{
          console.log('error')
      }
    }


  useEffect(() => {

    fetchData();
  }, []);



  const handleInputChange = async (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setMyUpdates({...myUpdates, [name]: value})
  }

  const [myUpdates, setMyUpdates] = useState({});
  const handleSubmit = async (event) => {
    event.preventDefault();
    const modelUrl = `http://localhost:8100/api/models/`
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(myUpdates),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(modelUrl, fetchConfig);

    if (response.ok) {
      const newModel = await response.json();
      console.log(newModel)
     } else {
      console.log('error')
     }
  }

          return (
              <div className="row">
                <div className="offset-3 col-6">
                  <div className="shadow p-4 mt-4">
                    <h1>Add a Model</h1>
                    <form onSubmit={handleSubmit} id="create-auto-form">
                    <div className="form-floating mb-3">
                        <input onChange={handleInputChange} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={handleInputChange} placeholder="Picture_url" required type="url" name="picture_url" id="picture_url" className="form-control"/>
                        <label htmlFor="picture_url">Picture (URL)</label>
                    </div>
                    <div className="form-floating mb-3">
                    <select onChange={handleInputChange} name="manufacturer_id" className="form-select">
                        <option value="">Choose a Model</option>
                        {manufacturers.map(manufacturers => {
                            return (
                                <option key={manufacturers.id} value={manufacturers.id}>
                                      {manufacturers.name}
                                </option>
                        );
                            })}
                    </select>
                </div>
                <button class="btn btn-success">Add Model</button>
                </form>
                </div>
            </div>
            </div>
       );
    }

export default ModelForm
