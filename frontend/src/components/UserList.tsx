import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  dob: string;
  phone_number: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/users/")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} ({user.username}) - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
