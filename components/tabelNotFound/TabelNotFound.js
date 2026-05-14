import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TabelNotFound() {
  return (
        <div className="tabel-not-found flex flex-col justify-center items-center gap-3 p-5 text-yellow-500">
            <FontAwesomeIcon
                icon={faCircleExclamation}
                className="text-yellow-500 text-5xl"
            />
            <div className="text">موردی یافت نشد.</div>
        </div>
  )
}
