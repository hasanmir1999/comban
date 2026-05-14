import Image from "next/image";

export default function LoginHeader() {
    return (
        <div className="login-header fixed w-full top-0 right-0 p-5">
            <Image
                width={100}
                height={100}
                className="w-20 object-cover"
                src={"/images/vezarat.png"}
                alt="logo"
            />
        </div>
    );
}
