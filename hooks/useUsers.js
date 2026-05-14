
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getUsers = async () => {
    const res = await api.get("/api-v1/read-users");
    console.log(res)
    return res.data;
};

export default function useUsers() {
    return useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    });
};
