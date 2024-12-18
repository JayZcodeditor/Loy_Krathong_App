"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import title from "../../../public/images/title/Title.png";
import k1 from "../../../public/images/kratong/k1.png";
import k2 from "../../../public/images/kratong/k2.png";
import k3 from "../../../public/images/kratong/k3.png";
import k4 from "../../../public/images/kratong/k4.png";
import k5 from "../../../public/images/kratong/k5.png";
import k6 from "../../../public/images/kratong/k6.png";
import k7 from "../../../public/images/kratong/k7.png";
import k8 from "../../../public/images/kratong/k8.png";
import { apiUrl } from "@/app/config/apisetting";
import "./Title.css";
import Swal from "sweetalert2"

const katongOptions = [k1, k2, k3, k4, k5, k6, k7, k8];

interface TitleProps {
    onFetchData: (data: any[]) => void;
}

function Title({ onFetchData }: TitleProps) {
    const [name, setName] = useState<string>("");
    const [wish, setWish] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imageBase64, setImageBase64] = useState<string | null>(null);
    const [selectedKatong, setSelectedKatong] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [count, setCount] = useState<number>(0);

    const fetchData = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/fetch_katong`);
            if (!response.ok) throw new Error("Failed to fetch data");

            const result = await response.json();

            // ตรวจสอบว่า result.data เป็น Array และแสดงข้อมูลทั้งหมด
            if (Array.isArray(result.data)) {
                setCount(result.data.length); // นับจำนวนทั้งหมด
                onFetchData(result.data);    // ส่งข้อมูลทั้งหมดไปยัง Props หรือ State
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };



    useEffect(() => {
        fetchData();
    }, []);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setImage(file);
            convertToBase64(file);
        } else {
            setImage(null);
            setImageBase64(null);
        }
    };

    const convertToBase64 = (file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setImageBase64(reader.result);
            }
        };
        reader.onerror = (error) => {
            console.error("Error converting file to base64:", error);
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = {
            name,
            wish,
            katong: selectedKatong,
            image: imageBase64,
        };

        // แสดง Swal เมื่อตอนเริ่มกระบวนการ
        Swal.fire({
            icon: 'info',
            title: 'กำลังลอยกระทง',
            text: 'กรุณารอสักครู่ กระทงพร้อมลอยแล้ว...',
            allowOutsideClick: false, // ป้องกันการปิดหน้าต่างโดยไม่ได้ตั้งใจ
            didOpen: () => {
                Swal.showLoading(); // แสดง Loading Indicator
            },
            // customClass: {
            //     popup: 'custom-swal-popup', 
            //     title: 'custom-swal-title',
            //     htmlContainer: 'custom-swal-text'
            // },
        });

        try {
            const response = await fetch(`${apiUrl}/api/make_katong`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const result = await response.json();
            console.log("Data successfully submitted:", result);
            fetchData();

            // Show success alert
            Swal.fire({
                icon: 'success',
                title: 'ลอยเสร็จสิ้น',
                text: 'ข้อมูลถูกส่งเรียบร้อยแล้ว',
                confirmButtonText: 'ตกลง'
            });

            // Clear form data
            setName("");
            setWish("");
            setSelectedKatong(null);
            setImage(null);
            setImageBase64(null);

            
        } catch (error) {
            console.error("Error submitting data:", error);
        } finally {
            setIsOpen(false);
        }
    };

    const onClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col items-center p-5">
            <Image
                src={title}
                width={800}
                height={50}
                alt="title"
                className="rounded-lg"
                priority
            />
            <div className="flex flex-col justify-center items-center space-x-5 w-full">
                <div className="flex items-center gap-2 mt-6">
                    <span className="px-2 text-5xl font-bold md:text-7xl text-white flex items-baseline">
                        <span className="text-lg md:text-2xl font-thin mr-1">จำนวนกระทง{'\u00A0'}</span>
                        <span>{count.toLocaleString()}</span>
                        <span className="text-lg md:text-2xl font-thin ml-1">กระทง</span>
                    </span>
                </div>

                <button
                    className="bg-transparent border-2 border-[#faff26] rounded-lg p-2 text-2xl font-bold text-[#fff] hover:bg-[#faff26] hover:text-black transition-colors mt-9"
                    onClick={() => setIsOpen(true)}
                >
                    สร้างกระทง
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 h-screen w-screen p-3">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md mx-auto relative overflow-y-auto max-h-[80vh]">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 text-white rounded-full p-2 bg-red-500 h-10 w-10 flex items-center justify-center"
                        >
                            X
                        </button>
                        <h2 className="text-4xl font-semibold mb-4 text-center">
                            สร้างกระทง
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <label className="block text-gray-700 font-medium">
                                ชื่อ (Name)
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="กรอกชื่อของคุณ"
                                className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <label className="block text-gray-700 font-medium">
                                คำอธิษฐาน (Wish)
                            </label>
                            <textarea
                                value={wish}
                                onChange={(e) => setWish(e.target.value)}
                                placeholder="ใส่คำอธิษฐาน"
                                className="w-full border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                            <label className="block text-gray-700 font-medium">
                                รูปภาพ (Image)
                            </label>
                            <input
                                type="file"
                                onChange={handleImageChange}
                                className="w-full p-3 rounded border border-gray-300 text-gray-700 cursor-pointer bg-white hover:bg-gray-100 hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                                accept="image/*"
                                required
                            />
                            <label className="block text-gray-700 font-medium mb-2">
                                เลือกกระทง
                            </label>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {katongOptions.map((katong, index) => (
                                    <div
                                        key={index}
                                        className={`border p-2 rounded cursor-pointer ${selectedKatong === index + 1
                                            ? "border-orange-500 border-4"
                                            : "border-gray-300"
                                            }`}
                                        onClick={() => setSelectedKatong(index + 1)}
                                    >
                                        <Image
                                            src={katong}
                                            alt={`Katong ${index + 1}`}
                                            className="w-full h-22 object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-orange-500 text-white p-2 rounded font-semibold hover:bg-orange-600"
                            >
                                ลอยกระทง
                            </button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Title;