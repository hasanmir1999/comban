import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserItemError() {
    return (
        <div className="user-item-error flex flex-col items-center rounded-lg justify-center text-white p-5 gap-3 bg-red-500">
            <FontAwesomeIcon
                icon={faCircleXmark}
                className="text-5xl"
            />
            <div className="text">خطا در دریافت اطلاعات.</div>
        </div>
    );
}
