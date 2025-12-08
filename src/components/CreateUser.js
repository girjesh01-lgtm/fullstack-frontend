import { useState } from "react";

function CreateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [msg, setMsg] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/users", {
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body:JSON.stringify({name, email})
            })
            .then(res => res.json())
            .then(data => setMsg("User created: " + data.id))
            .catch(err => setMsg("Error : " + err));
    };

    return (
        <div>
            <h2>Create User</h2>
            <form onSubmit={handleSubmit}>

                <input 
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                <br /><br />

                <input 
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <button type="submit">Submit</button>

            </form>

            <p>{msg}</p>
        </div>
    );
 }

 export default CreateUser;
 