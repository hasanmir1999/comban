// hooks/useInspections.js
import { useQuery } from "@tanstack/react-query";

export const useInspections = () => {
    return useQuery({
        queryKey: ["inspections"],
        queryFn: async () => {
            const response = await fetch("https://lotexev.ir/api-v1/list-inspections");
            if (!response.ok) {
                throw new Error("خطا در دریافت لیست بازرسی‌ها");
            }
            const data = await response.json();
            return data.inspections || data;
        },
    });
};
