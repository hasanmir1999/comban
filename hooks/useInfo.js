import api from '@/lib/axios'
import { useQuery } from "@tanstack/react-query";

const getInfo = async () => {
    const res = await api.get("/api-v1/me");
    return res.data;
};

export default function useInfoQuery() {
    return useQuery({
        queryKey: ["admin_id"],
        queryFn: () => getInfo(),
    });
}