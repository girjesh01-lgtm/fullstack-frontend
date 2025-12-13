import "../styles/error.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorBanner from "./ErrorBanner";

function CreateUser() {
    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    const [fieldErrors, setFieldErrors] = useState({});
    const [serverError, setServerError] = useState();
    const navigate = useNavigate();

    // Handle input changes generically
    const handleChange = (e) => {
        const { name, value } = e.target;

        setUser((prev) => ({
            ...prev,
            [name]:value,
        }));

        setFieldErrors((prev) => ({
            ...prev,
            [name]:"",
        }))
    };

    const validate = () => {
        const errors = {};

        if(!user.name.trim()) {
            errors.name = "Name is required";
        }

        if(!user.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
            errors.email = "Invalid email format";
        }

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFieldErrors({});
        setServerError("");
        try {
            const errors = validate();
            if(Object.keys(errors).length > 0) {
                setFieldErrors(errors);
                return;
            }
            const response = await fetch("http://localhost:8080/api/users", {
                method: "POST",
                headers: { "Content-Type":"application/json" },
                body: JSON.stringify(user)
            });
            
            if (response.status === 400) {
                const errorData = await response.json();

                // Case: Validation errors
                if (typeof errorData === "object") {
                    setFieldErrors(errorData);
                }

                // Case: Email duplicate or general message
                if (errorData.error) {
                    setServerError(errorData.error);
                }
                return;
            }

            if (!response.ok) {
                setServerError("Something went wrong");
                return;
            }

            // Success
            alert("User created successfully");
            navigate("/");

        } catch (err) {
            setServerError("Server unreachable");
        }
    };

    return (
        <div>
            <h2>Create User</h2>
            <ErrorBanner message={serverError} />
            
            <form onSubmit={handleSubmit}>

                <input 
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={user.name}
                    onChange={handleChange}
                    className={fieldErrors?.name ? "error-input" : ""}
                />
                {fieldErrors?.name && (
                    <p className="error-text">{fieldErrors?.name}</p>
                )}

                <br /><br />

                <input 
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={handleChange}
                    className={fieldErrors.email ? "error-input" : ""}
                />
                {fieldErrors?.email && (
                    <p className="error-text">{fieldErrors?.email}</p>
                )}
                <br /><br />

                <button type="submit" disabled={!user.email || !user.name}>Submit</button>

            </form>
        </div>
    );
 }

 export default CreateUser;
 