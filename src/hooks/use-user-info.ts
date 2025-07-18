import { useCallback, useState } from "react";
import axios from "@/libs/axios";
import { useUsers } from "@/stores/use-users";
import useUserPrize from "@/hooks/use-user-prize";

export default function useUserInfo(address?: string) {
  const [info, setInfo] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { getUserPrize } = useUserPrize();
  const usersStore = useUsers();

  const onQueryUserInfo = useCallback(async () => {
    if (!address) {
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get("/api/v1/user");
      const _info = res.data.data;
      if (!_info.icon) {
        if (usersStore.users[address]) {
          _info.icon = usersStore.users[address].icon;
        } else {
          const random = Math.floor(Math.random() * 7) + 1;
          _info.icon = `/avatar/${random}.svg`;
          usersStore.setUsers({
            [address]: {
              icon: _info.icon
            }
          });
        }
      }
      setInfo(res.data.data);
      getUserPrize();
    } catch (err) {
      console.log("err", err);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  }, [address]);

  return { info, loading, onQueryUserInfo, setInfo };
}
