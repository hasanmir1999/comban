import "./globals.css";
import { iranSans } from "./fonts";
import Toast from "@/components/toast/Toast";

export default function RootLayout({ children }) {
    return (
        <html lang="fa" dir="rtl" className={iranSans.className}>
            <body className="bg-gray-100">
                <Toast />
                {children}
            </body>
        </html>
    );
}
