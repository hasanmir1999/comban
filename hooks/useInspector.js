// hooks/useInspectors.js
import { useQuery } from "@tanstack/react-query";

const fetchInspectors = async (searchTerm = "") => {
    const response = await fetch(
        `https://lotexev.ir/api-v1/inspectors/inspectors-list?search=${searchTerm}`
    );
    if (!response.ok) {
        throw new Error("خطا در دریافت لیست بازرسان");
    }
    const data = await response.json();
    return data.inspectors;
};

export const useInspectors = (searchTerm = "") => {
    return useQuery({
        queryKey: ["inspectors", searchTerm],
        queryFn: () => fetchInspectors(searchTerm),
        staleTime: 5 * 60 * 1000,
    });
};
