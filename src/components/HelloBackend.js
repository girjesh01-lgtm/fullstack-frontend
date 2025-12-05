import { useEffect, userState, useState } from "react";

function HelloBackend() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:8080/api/hello")
        .then(r => r.text())
        .then(data => setMessage(data));
        //.then(data => console.log(data))
        //.catch(err => console.error(err));
    }, []);


    return (
        <div>
            <h2>Backend Says:</h2>
            <p>{message}</p>
        </div>
    );
}

export default HelloBackend;