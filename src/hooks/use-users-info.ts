import { useUsers } from "@/stores/use-users";
import axiosInstance from "@/libs/axios";

export default function useUsersInfo() {
  const usersStore = useUsers();

  const fetchUsersInfo = async (users: string[]) => {
    const needFetchUsers = users.filter((user) => {
      if (!usersStore.users[user]) return true;
      return (
        usersStore.users[user].fetched_time <
        Date.now() - 1000 * 60 * 60 * 24 * 7
      );
    });
    if (needFetchUsers.length === 0) return;
    const usersInfo = await axiosInstance.get(
      `/api/users/batch?user_ids=${[...new Set(needFetchUsers)].join(",")}`
    );

    const formattedUsers = usersInfo.data.data.reduce(
      (acc: Record<string, any>, user: any) => {
        acc[user.id] = user;
        return acc;
      },
      {}
    );
    usersStore.setUsers(formattedUsers);
  };

  return { fetchUsersInfo, users: usersStore.users };
}
