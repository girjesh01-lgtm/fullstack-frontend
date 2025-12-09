import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserTable() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const loadUsers = () => {
        setLoading(true);
        setError(null);

        fetch("http://localhost:8080/api/users")
        .then(res => { 
            if (!res.ok) {
                throw new Error("Failed to fetch users");
            }
            return res.json();
        })
        .then(data => setUsers(data))
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    };

    useEffect(() => {
        loadUsers();
    }, []);


    const deleteUser = (id) => {
        fetch(`http://localhost:8080/api/users/${id}`, {
            method: "DELETE"
        })
        .then(() => loadUsers());
    };

    if (loading) {
        return <h3>Loading...</h3>
    }

    return (
        <div>
            <h2>User List</h2>
            
            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>
                                <button onClick={() => deleteUser(u.id)}>Delete</button>
                                &nbsp;
                                <button onClick={() => navigate(`/edit/${u.id}`)}>Update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserTable;