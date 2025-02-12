import { useUsers } from "../../hooks/useUsers";
import { UsersList } from "../UsersList/UsersList";

export const UsersContainer = () => {
  const users = useUsers();

  return <UsersList users={users} />;
}