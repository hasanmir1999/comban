import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function PlzSearch() {
  return (
        <div className="tabel-plz-search flex flex-col justify-center items-center gap-3 p-5 text-gray-400">
            <FontAwesomeIcon className="text-5xl" icon={faMagnifyingGlass} />
            <div className="text-sm">برای بازررسی سریال VIN کمباین مورد نظر را جستجو کنید</div>
        </div>
  )
}
