// hooks/useUsers.js
import { useQuery } from "@tanstack/react-query";

export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await fetch("https://lotexev.ir/api-v1/read-users");
            if (!response.ok) {
                throw new Error("خطا در دریافت لیست کاربران");
            }
            const data = await response.json();
            return data.users;
        },
    });
};
