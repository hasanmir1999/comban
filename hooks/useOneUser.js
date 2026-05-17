import api from '@/lib/axios'
import { useQuery } from "@tanstack/react-query";

const getInfo = async (user_id) => {
    const res = await api.get(`/api-v1/read-user/${user_id}`);
    return res.data;
};

export default function useOneUserQuery(user_id) {
    return useQuery({
        queryKey: ["one_user", user_id], 
        queryFn: () => getInfo(user_id),
        enabled: !!user_id,
    });
}
