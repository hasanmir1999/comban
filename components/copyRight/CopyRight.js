import Image from "next/image";

export default function CopyRight() {


    return (
        <div className="copy-right p-3 bg-gray-200 fixed bottom-0 w-full gap-3 text-center text-gray-600 text-xs sm:text-sm flex justify-center items-center">
            {/* <Image
                width={100}
                height={100}
                className="w-15 object-cover"
                src={"/images/vezarat.png"}
                alt="logo"
            /> */}
            <p className="text">
                © ۱۴۰۵ - تمامی حقوق مادی و معنوی این وب‌سایت متعلق به وزارت جهاد
                کشاورزی جمهوری اسلامی ایران می‌باشد.
            </p>
        </div>
    );
}
