import "./globals.css";
import { iranSans } from "./fonts";
import Toast from "@/components/toast/Toast";
import QueryProvider from "@/components/queryProvider/QueryProvider";

export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl" className={iranSans.className}>
            <body className="bg-gray-100">
                <Toast />
                <QueryProvider>{children}</QueryProvider>
            </body>
        </html>
    );
}
