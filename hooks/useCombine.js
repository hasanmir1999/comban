import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const fetchCombine = async (searchTerm = "") => {
    const { data } = await api.get(
        `/api-v1/list-combines?search=${searchTerm}`,
    );
    return data.combines ;
};

export const useCombine = (searchTerm) => {
    return useQuery({
        queryKey: ["combine", searchTerm],
        queryFn: () => fetchCombine(searchTerm),
        staleTime: 5 * 60 * 1000,
        retry: 2,
        enabled: !!searchTerm, 
    });
};