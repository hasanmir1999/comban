"use client";
import InputContainer from "@/components/inputContainer/InputContainer";
import InputLoading from "@/components/inputLoading/InputLoading";
import InsertDropMenu from "@/components/insertDropMenu/InsertDropMenu";
import SwitchBtn from "@/components/switchBtn/SwitchBtn";
import useOneUserQuery from "@/hooks/useOneUser";
import api from "@/lib/axios";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditUserPage() {
    const params = useParams();
    const userId = params._id;
    const [loading, setLoading] = useState(false);
    const { data: userData, status } = useOneUserQuery(userId);

    const roles = [
        { id: 1, name: "مرکز جهاد کشاورزی" },
        { id: 2, name: "کاربر نظام مهندسی" },
        { id: 3, name: "ناظر کمباین" },
        { id: 4, name: "مدیر مکانیزاسیون استان" },
        { id: 5, name: "مدیر برنامه" },
    ];
    const [formData, setFormData] = useState({
        username: "",
        name: "",
        lastname: "",
        phone: "",
        national_code: "",
        engineer_code: "",
        role_id: 0,
        password: "",
        permissions: {
            combine_view: false,
            combine_create: false,
            combine_update: false,
            combine_delete: false,
            user_view: false,
            user_create: false,
            user_update: false,
            user_delete: false,
            inspection_create: false,
            inspection_update: false,
        },
    });
    useEffect(() => {
        if (userData) {
            console.log("userData received:", userData);
            console.log("permissions:", userData.permissions);
            setFormData({
                username: userData.username || "",
                name: userData.name || "",
                lastname: userData.lastname || "",
                phone: userData.phone || "",
                national_code: userData.national_code || "",
                engineer_code: userData.engineer_code || "",
                role_id: userData.role_id || 0,
                password: "",
                permissions: {
                    combine_view: userData.permissions?.combine_view || false,
                    combine_create:
                        userData.permissions?.combine_create || false,
                    combine_update:
                        userData.permissions?.combine_update || false,
                    combine_delete:
                        userData.permissions?.combine_delete || false,
                    user_view: userData.permissions?.user_view || false,
                    user_create: userData.permissions?.user_create || false,
                    user_update: userData.permissions?.user_update || false,
                    user_delete: userData.permissions?.user_delete || false,
                    inspection_create:
                        userData.permissions?.inspection_create || false,
                    inspection_update:
                        userData.permissions?.inspection_update || false,
                },
            });
        }
    }, [userData]);

    const handleUpdate = async () => {
        setLoading(true);
        console.log(formData)
        try {
            const response = await api.put(
                `/api-v1/update-user/${userId}`,
                formData,
            );

            if (response.status === 200) {
                toast.success("کاربر با موفقیت ویرایش شد");
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error("Error updating user:", error);
            toast.error(error.response?.data?.message || "خطا در ویرایش کاربر");
        }
    };

    return (
        <div className="edit-user-page bg-white w-full min-h-svh pt-30 pb-5 px-10 lg:pr-90">
            <div className="main-content">
                <div className="title flex items-center gap-2">
                    <div className="icon">
                        <div className="size-5 rounded-lg bg-emerald-600"></div>
                    </div>
                    <h1 className="text-lg text-gray-800 font-bold">
                        ویرایش اطلاعات کاربر
                    </h1>
                </div>
                <div className="form-container mt-8">
                    <div className="row flex flex-wrap gap-y-5">
                        {status === "pending" ? (
                            <>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputLoading />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputLoading />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputLoading />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputLoading />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputLoading />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputLoading />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputLoading />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputLoading />
                                </div>
                            </>
                        ) : status === "success" ? (
                            <>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputContainer
                                        title={
                                            <>
                                                نام
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </>
                                        }
                                        type={"text"}
                                        value={formData.name}
                                        onChange={(v) =>
                                            setFormData((p) => ({
                                                ...p,
                                                name: v,
                                            }))
                                        }
                                        dir={"rtl"}
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputContainer
                                        title={
                                            <>
                                                نام خانوادگی
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </>
                                        }
                                        type={"text"}
                                        value={formData.lastname}
                                        onChange={(v) =>
                                            setFormData((p) => ({
                                                ...p,
                                                lastname: v,
                                            }))
                                        }
                                        dir={"rtl"}
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputContainer
                                        title={<>شماره تماس</>}
                                        type={"text"}
                                        value={formData.phone}
                                        onChange={(v) =>
                                            setFormData((p) => ({
                                                ...p,
                                                phone: v,
                                            }))
                                        }
                                        dir={"ltr"}
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputContainer
                                        title={<>کد ملی</>}
                                        type={"text"}
                                        value={formData.national_code}
                                        onChange={(v) =>
                                            setFormData((p) => ({
                                                ...p,
                                                national_code: v,
                                            }))
                                        }
                                        dir={"ltr"}
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputContainer
                                        title={<>کد نظام مهندسی</>}
                                        type={"text"}
                                        value={formData.engineer_code}
                                        onChange={(v) =>
                                            setFormData((p) => ({
                                                ...p,
                                                engineer_code: v,
                                            }))
                                        }
                                        dir={"ltr"}
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InsertDropMenu
                                        title={
                                            <>
                                                نقش کاربری
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </>
                                        }
                                        menuItems={roles}
                                        selectedValue={formData.role_id}
                                        onClick={(value) =>
                                            setFormData((p) => ({
                                                ...p,
                                                role_id: value,
                                            }))
                                        }
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputContainer
                                        title={
                                            <>
                                                نام کاربری
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </>
                                        }
                                        type={"text"}
                                        value={formData.username}
                                        onChange={(v) =>
                                            setFormData((p) => ({
                                                ...p,
                                                username: v,
                                            }))
                                        }
                                        dir={"rtl"}
                                    />
                                </div>
                                <div className="col w-full sm:w-1/2 md:w-4/12 lg:w-3/12 p-1">
                                    <InputContainer
                                        title={
                                            <>
                                                گذرواژه
                                                <span className="text-red-500">
                                                    *
                                                </span>
                                            </>
                                        }
                                        type={"password"}
                                        value={formData.password}
                                        onChange={(v) =>
                                            setFormData((p) => ({
                                                ...p,
                                                password: v,
                                            }))
                                        }
                                        dir={"ltr"}
                                    />
                                </div>
                            </>
                        ) : (
                            status === "error" && ""
                        )}
                    </div>
                    <div className="permissions mt-10">
                        <div className="combine-permissions">
                            <div className="title flex items-center gap-2">
                                <div className="icon">
                                    <div className="size-5 rounded-lg bg-emerald-600"></div>
                                </div>
                                <h5 className="text-lg text-gray-800 font-bold">
                                    دسترسی کمباین ها
                                </h5>
                            </div>
                            <div className="row flex flex-wrap mt-8">
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions.combine_view
                                        }
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                permissions: {
                                                    ...prev.permissions,
                                                    combine_view:
                                                        !prev.permissions
                                                            .combine_view,
                                                },
                                            }))
                                        }
                                        title={"مشاهده کمباین:"}
                                    />
                                </div>
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions.combine_create
                                        }
                                        onClick={() =>
                                            setFormData((p) => ({
                                                ...p,
                                                permissions: {
                                                    ...p.permissions,
                                                    combine_create:
                                                        !p.permissions
                                                            .combine_create,
                                                },
                                            }))
                                        }
                                        title={"ثبت کمباین:"}
                                    />
                                </div>
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions.combine_update
                                        }
                                        onClick={() =>
                                            setFormData((p) => ({
                                                ...p,
                                                permissions: {
                                                    ...p.permissions,
                                                    combine_update:
                                                        !p.permissions
                                                            .combine_update,
                                                },
                                            }))
                                        }
                                        title={"ویرایش کمباین:"}
                                    />
                                </div>
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions.combine_delete
                                        }
                                        onClick={() =>
                                            setFormData((p) => ({
                                                ...p,
                                                permissions: {
                                                    ...p.permissions,
                                                    combine_delete:
                                                        !p.permissions
                                                            .combine_delete,
                                                },
                                            }))
                                        }
                                        title={"حذف کمباین:"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="users-permissions mt-10">
                            <div className="title flex items-center gap-2">
                                <div className="icon">
                                    <div className="size-5 rounded-lg bg-emerald-600"></div>
                                </div>
                                <h5 className="text-lg text-gray-800 font-bold">
                                    دسترسی کاربران
                                </h5>
                            </div>
                            <div className="row flex flex-wrap mt-8">
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions.user_view
                                        }
                                        onClick={() =>
                                            setFormData((p) => ({
                                                ...p,
                                                permissions: {
                                                    ...p.permissions,
                                                    user_view:
                                                        !p.permissions
                                                            .user_view,
                                                },
                                            }))
                                        }
                                        title={"مشاهده کاربران:"}
                                    />
                                </div>
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions.user_create
                                        }
                                        onClick={() =>
                                            setFormData((p) => ({
                                                ...p,
                                                permissions: {
                                                    ...p.permissions,
                                                    user_create:
                                                        !p.permissions
                                                            .user_create,
                                                },
                                            }))
                                        }
                                        title={"ایجاد کاربر:"}
                                    />
                                </div>
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions.user_update
                                        }
                                        onClick={() =>
                                            setFormData((p) => ({
                                                ...p,
                                                permissions: {
                                                    ...p.permissions,
                                                    user_update:
                                                        !p.permissions
                                                            .user_update,
                                                },
                                            }))
                                        }
                                        title={"ویرایش کاربر:"}
                                    />
                                </div>
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions.user_delete
                                        }
                                        onClick={() =>
                                            setFormData((p) => ({
                                                ...p,
                                                permissions: {
                                                    ...p.permissions,
                                                    user_delete:
                                                        !p.permissions
                                                            .user_delete,
                                                },
                                            }))
                                        }
                                        title={"حذف کاربر:"}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="users-permissions mt-10">
                            <div className="title flex items-center gap-2">
                                <div className="icon">
                                    <div className="size-5 rounded-lg bg-emerald-600"></div>
                                </div>
                                <h5 className="text-lg text-gray-800 font-bold">
                                    دسترسی بازررسی ها
                                </h5>
                            </div>
                            <div className="row flex flex-wrap mt-8">
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions
                                                .inspection_create
                                        }
                                        onClick={() =>
                                            setFormData((p) => ({
                                                ...p,
                                                permissions: {
                                                    ...p.permissions,
                                                    inspection_create:
                                                        !p.permissions
                                                            .inspection_create,
                                                },
                                            }))
                                        }
                                        title={"مشاهده بازررسی:"}
                                    />
                                </div>
                                <div className="col w-1/2 p-2 md:w-3/12 lg:1/12">
                                    <SwitchBtn
                                        selectedValue={
                                            formData.permissions
                                                .inspection_update
                                        }
                                        onClick={() =>
                                            setFormData((p) => ({
                                                ...p,
                                                permissions: {
                                                    ...p.permissions,
                                                    inspection_update:
                                                        !p.permissions
                                                            .inspection_update,
                                                },
                                            }))
                                        }
                                        title={"انجام بازررسی:"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="btn-container flex justify-center items-center mt-5 whitespace-nowrap text-sm">
                        <button
                            onClick={handleUpdate}
                            className="text-white flex justify-center items-center gap-2 cursor-pointer outline-none bg-emerald-600 rounded-lg py-1.75 px-20"
                        >
                            ویرایش اطلاعات
                            {loading ? (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className="animate-spin"
                                />
                            ) : (
                                ""
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
