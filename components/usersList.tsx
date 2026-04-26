// UsersList.tsx
import { useUsers } from "../hooks/useUsers";

export default function UsersList() {
  const { users, status } = useUsers();

  if (status === "loading") return <p>Loading...</p>;
  if (status === "error") return <p>Error loading users</p>;

  return (
    <ul>
      {users.map((user, index) => (
        <li key={`${user[index]}`}>{user}</li>
      ))}
    </ul>
  );
}