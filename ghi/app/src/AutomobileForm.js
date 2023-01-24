import React, { useEffect, useState } from 'react';

function AutomobileForm () {

  const [automobile, setAutomobile] = useState([]);
  const fetchData = async () => {
      const url = 'http://localhost:8100/api/automobiles/';

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        setBins(data.bins)
      } else {
          console.log('ERROR')
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
    const binUrl = `http://localhost:8100${myUpdates.bins}shoes/`
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(myUpdates),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(binUrl, fetchConfig);

    if (response.ok) {
      const newShoe = await response.json();
      console.log(newShoe)
     } else {
      console.log('ERROR')
     }
}

        return (
            <div className="row">
              <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                  <h1>Create A New Shoe</h1>
                  <form onSubmit={handleSubmit} id="create-bin-form">
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} placeholder="Manufacturer" required type="text" name="manufacturer" id="manufacturer" className="form-control"/>
                      <label htmlFor="manufacturer">manufacturer</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} placeholder="model" required type="text" name="model_name" id="model_name" className="form-control"/>
                      <label htmlFor="model_name">model</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                      <label htmlFor="color">color</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input onChange={handleInputChange} placeholder="Picture" required type="text" name="picture_url" id="picture_url" className="form-control"/>
                      <label htmlFor="picture_url">picture</label>
                    </div>
                    <div className="form-floating mb-3">
                    <select onChange={handleInputChange} required name="Bin" id="bin" className="form-select">
                                    <option value="">Choose a bin</option>
                                    {bins.map( bin => {
                                        return (
                                        <option key={bin.href} value={bin.href}>
                                    {bin.closet_name}
                                </option>
                            )
                            })};
                        </select>
                    </div>
                    <button className="btn btn-primary">Create</button>
                  </form>
                </div>
            </div>
        </div>
    );
}

export default AutomobileForm
