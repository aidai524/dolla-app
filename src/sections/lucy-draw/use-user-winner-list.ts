import axiosInstance from "@/libs/axios";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/auth";

export default function useUserWinnerList() {
  const { userInfo } = useAuth();
  const listRef = useRef<any>(null);
  const [currentWinner, setCurrentWinner] = useState<any>(null);

  const fetchUserWinnerList = async () => {
    try {
      const res = await axiosInstance.get(
        `/api/v1/user/ticket/winning/list?claim=false&limit=100&offset=0`
      );
      listRef.current = res.data.data;
      getCurrentWinner();
    } catch (err) {}
  };

  const getCurrentWinner = () => {
    if (!listRef.current) return null;
    const winner = listRef.current.pop();
    setCurrentWinner(winner);
  };

  useEffect(() => {
    if (userInfo?.user) {
      fetchUserWinnerList();
    }
  }, [userInfo]);

  return {
    currentWinner,
    getCurrentWinner
  };
}
