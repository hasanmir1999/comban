import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchCombines = async (searchTerm = "") => {
    const { data } = await api.get(
        `/api-v1/list-combines?search=${searchTerm}`,
    );
    return data.combines;
};

export const useCombines = (searchTerm) => {
    return useQuery({
        queryKey: ["combines", searchTerm],
        queryFn: () => fetchCombines(searchTerm),
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!searchTerm, 
    });
};