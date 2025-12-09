import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";

function HomePage() {
    const navigate = useNavigate();
    
    return (
    <>
        <button onClick={() => navigate(`/create`)}>Create User</button>
        <UserTable />
    </>
  );
}

export default HomePage;