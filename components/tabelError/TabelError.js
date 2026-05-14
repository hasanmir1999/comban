import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TabelError() {
    return (
        <div className="tabel-error flex flex-col justify-center items-center gap-3 p-5 text-red-500">
            <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-red-500 text-5xl"
            />
            <div className="text">خطا در دریافت اطلاعات.</div>
        </div>
    );
}
