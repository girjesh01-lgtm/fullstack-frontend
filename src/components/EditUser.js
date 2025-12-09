import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function EditUser() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name : "",
        email : ""
    });

    useEffect(() => {
        fetch(`http://localhost:8080/api/users/${id}`)
        .then(res => res.json())
        .then(data => setUser(data))
    }, [id]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/users/${id}`, {
            method: "PUT",
            headers: { "content-Type": "application/json" },
            body: JSON.stringify(user)
        })
        .then(() => navigate("/"));
    };


    return (
        <div>
            <h2> Edit User</h2>

            <form onSubmit={handleSubmit}>
                <label>Name:</label><br/>
                <input 
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                /><br/><br />

                <label>Email:</label><br />
                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                /><br /><br />

                <button type="submit">Update User</button>    
            </form>
        </div>
    )
}


export default EditUser;