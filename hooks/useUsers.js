import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getUsers = async (national_code) => {
    const url = national_code 
        ? `/api-v1/read-users?national_code=${national_code}`
        : `/api-v1/read-users`;
    
    const res = await api.get(url);
    console.log(res);
    return res.data;
};

export default function useUsers(national_code = "") {
    return useQuery({
        queryKey: ["users", national_code],
        queryFn: () => getUsers(national_code),
        staleTime: 30000,
    });
}
