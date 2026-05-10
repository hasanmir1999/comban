// hooks/useStatistics.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStatistics = async () => {
    const { data } = await axios.get("https://lotexev.ir/api-v1/statistics");
    return data;
};

export const useStatistics = () => {
    return useQuery({
        queryKey: ["statistics"],
        queryFn: fetchStatistics,
        staleTime: 5 * 60 * 1000,
    });
};
