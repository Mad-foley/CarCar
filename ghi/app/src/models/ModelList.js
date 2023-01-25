import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function ModelList() {
    const [models, setModels] = useState([])
    const getData = async () => {
      const response = await fetch('http://localhost:8100/api/models/')
      if(response.ok) {
          const data = await response.json()
          setModels(data.models)
      }
    }
    useEffect(() => {
      getData();
    }, [])


    return (
        <div>
          <h1>Technicians</h1>
          <hr></hr>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee Number</th>
              </tr>
            </thead>
            <tbody>
              {models.map(model =>{
                return (
                  <tr key={model.name}>
                    <td>{model.name}</td>
                    <td><img src={model.picture_url}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <hr>
            </hr>
            <NavLink className="nav-link" to="new"><button className="btn btn-success">Add New Technician</button></NavLink>
          </div>
        </div>
      )
  }

export default ModelList
