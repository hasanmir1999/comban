// hooks/useStatistics.js
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchStatistics = async () => {
    const { data } = await api.get("/api-v1/dashboard/stats");
    return data;
};

export const useStatistics = () => {
    return useQuery({
        queryKey: ["statistics"],
        queryFn: fetchStatistics,
        staleTime: 5 * 60 * 1000,
    });
};
