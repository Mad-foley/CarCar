import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AutomobileList() {
    const [automobile, setAutomobile] = useState([])

    const getData = async () => {
        const url = await fetch`http://localhost:8100/api/automobiles/}`;
        const data = await url.json()
        setAutomobile(data.autos)
    }

    useEffect(() => {

        getData();
    }, [])

  return (
    <div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>VIN</th>
            <th>Color</th>
            <th>Model</th>
            <th>Year</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {automobile.map(automobile => {
            return (
              <tr key={automobile.id}>
                <td>
                {automobile.vin}
                </td>
                <td>{automobile.color}</td>
                <td>{automobile.model.name}</td>
                <td>{automobile.year}</td>
                <td>{automobile.manufacturer.name}</td>
                <td>
                <button style={{ color: "#FF0000" }}
                className="btn"
                type="delete" onClick = { async ()=>{
                const url = await fetch(`http://localhost:8100/api/automobiles/${automobile.id}/`,{ method:"DELETE"})
                const data = await url.json()
                getData()
                }}
                >DELETE</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <NavLink className="nav-link" aria-current="page" to="new">
          <button>ADD</button>
        </NavLink>
      </div>
    </div>
  );
}

export default AutomobileList;
