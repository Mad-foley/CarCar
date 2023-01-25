import {useState} from 'react';

const CustomerForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phone_number: ''
    });

    const [error, setError] = useState(false);
    const [sent, setSent] = useState(false);

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        };

        const response = await fetch("http://localhost:8090/api/customers/", fetchConfig);
        if (response.ok) {
            document.getElementById("form").reset()
            setSent(true)
            setTimeout(() => {
                setSent(false)
              }, 3000);
        } else {
            setSent(false)
            setError(true)
            setTimeout(() => {
                setError(false)
              }, 4000);
        };
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-3 mt-4">
                    { error && <div className="alert alert-danger">Failed to add</div>}
                    { sent && <div className="alert alert-success">Success!</div>}
                    <h1>Add a customer</h1>
                    <form onSubmit={handleSubmit} id="form">

                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="..." type="text" name="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="..." type="text" name="address" className="form-control"/>
                            <label htmlFor="address">Address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="..." type="text" name="phone_number" className="form-control"/>
                            <label htmlFor="phone_number">Phone Number</label>
                        </div>

                    <button className="btn btn-primary">Add</button>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default CustomerForm;
