import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TableLoading() {
    return (
        <div className="tabel-loading flex flex-col justify-center items-center gap-3 p-5 text-emerald-600">
            <FontAwesomeIcon className="text-5xl animate-spin" icon={faSpinner} />
            <div className="text">در حال بارگزاری...</div>
        </div>
    );
}
