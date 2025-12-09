import { useEffect, useState } from "react";

function UserList() {
    const [users, setUsers] =  useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/users")
        .then(res => res.json())
        .then(data => setUsers(data))
    }, []);

    return (
        <div>
            <h2>All Users:</h2>
            <ul>
                {users.map(u => (
                    <li key={u.id}>
                        {u.id}. {u.name} - {u.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;