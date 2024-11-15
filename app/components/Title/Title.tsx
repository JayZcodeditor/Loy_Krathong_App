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

const katongOptions = [k1, k2, k3, k4, k5, k6, k7, k8];

interface TitleProps {
  onFetchData: (data: any[]) => void;
}

function Title({ onFetchData }: TitleProps) {
  const [name, setName] = useState<string>("");
  const [wish, setWish] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [selectedKatong, setSelectedKatong] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0); // เพิ่ม state สำหรับเก็บจำนวนกระทง

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/fetch_katong`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const result = await response.json();
      if (Array.isArray(result.data)) {
        setCount(result.data.length); // นับจำนวนข้อมูลและเก็บใน count
        onFetchData(result.data); // ส่งข้อมูลที่ได้ไปยัง Home
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // ดึงข้อมูลเมื่อโหลด component
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      convertToBase64(file);
    } else {
      setImage(null);
      setImagePreview(null);
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
      fetchData(); // ดึงข้อมูลใหม่หลังจากโพสต์สำเร็จ
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
      <div className="flex items-center gap-2 mt-5">
  <span className="px-2 text-5xl font-bold md:text-7xl text-white flex items-baseline">
    <span className="text-lg md:text-2xl font-thin mr-1">จำนวนกระทง{'\u00A0'}</span>
    <span>{count.toLocaleString()}</span>
    <span className="text-lg md:text-2xl font-thin ml-1">{'\u00A0'}กระทง</span>
  </span>
</div>



        <button
          className="bg-transparent border-2 border-[#fff] rounded-lg p-2 text-2xl font-bold text-[#fff] hover:bg-[#faff26] hover:text-black transition-colors mt-9"
          onClick={() => setIsOpen(true)}
        >
          สร้างกระทง
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 h-screen w-screen overflow-hidden p-3">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-auto relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              X
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">
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
                className="w-full border border-gray-300 p-2 rounded mb-2"
                required
              />

              <label className="block text-gray-700 font-medium">
                คำอธิษฐาน (Wish)
              </label>
              <textarea
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="ใส่คำอธิษฐาน"
                className="w-full border border-gray-300 p-2 rounded mb-2"
                required
              />

              <label className="block text-gray-700 font-medium">
                รูปภาพ (Image)
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full border border-gray-300 p-2 rounded mb-2"
                accept="image/*"
                required
              />

              {imagePreview && (
                <div className="my-2">
                  <img
                    src={imagePreview}
                    alt="Selected Image Preview"
                    className="w-full h-32 object-cover rounded"
                  />
                </div>
              )}

              <label className="block text-gray-700 font-medium mb-2">
                เลือกกระทง
              </label>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {katongOptions.map((katong, index) => (
                  <div
                    key={index}
                    className={`border p-2 rounded cursor-pointer ${
                      selectedKatong === index + 1
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    onClick={() => setSelectedKatong(index + 1)}
                  >
                    <Image
                      src={katong}
                      alt={`Katong ${index + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded font-semibold hover:bg-blue-600"
              >
                บันทึกข้อมูล
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Title;
