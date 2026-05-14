// hooks/useInspectors.js
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

const fetchInspectors = async (searchTerm = "") => {
    const res = await api.get(
        `/api-v1/inspectors/inspectors-list?search=${searchTerm}`
    );

    return res.data;
};

export const useInspectors = (searchTerm = "") => {
    return useQuery({
        queryKey: ["inspectors", searchTerm],
        queryFn: () => fetchInspectors(searchTerm),
        staleTime: 5 * 60 * 1000,
    });
};
