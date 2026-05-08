import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ResUserInfoBox() {
    return (
        <div className="user-info-container p-2 rounded-lg gap-3 border border-emerald-600 flex items-center w-full">
            <div className="icon size-10 p-3 rounded-lg bg-emerald-600 text-white">
                <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="text">
                <h5 className="username text-gray-900">محمد حسن میر</h5>
                <p className="role text-xs text-gray-700">ناظر کمباین</p>
            </div>
        </div>
    );
}
