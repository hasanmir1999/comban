import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserInfoBoxLoading from "../userInfoBoxLoading/UserInfoBoxLoading";
import UserInfoBoxError from "../userInfoBoxError/UserInfoBoxError";

export default function UserInfoBox() {
    let status = "error";

    return (
        <>
            {status === "success" ? (
                <div className="user-info-container hidden p-2 rounded-lg gap-3 border border-emerald-600 sm:flex items-center w-70">
                    <div className="icon size-10 flex justify-center items-center text-lg rounded-lg bg-emerald-600 text-white">
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="text">
                        <h5 className="username text-gray-900">محمد حسن میر</h5>
                        <p className="role text-xs text-gray-700">
                            ناظر کمباین
                        </p>
                    </div>
                </div>
            ) : status === "loading" ? (
                <UserInfoBoxLoading />
            ) : (
                status === "error" && <UserInfoBoxError />
            )}
        </>
    );
}
