// useUsers.js (Custom Hook para la lógica)
import { useState, useEffect } from "react";

export function useUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return users;
}
