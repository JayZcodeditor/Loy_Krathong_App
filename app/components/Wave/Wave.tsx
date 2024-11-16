"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import k1 from "../../../public/images/kratong/k1.png";
import k2 from "../../../public/images/kratong/k2.png";
import k3 from "../../../public/images/kratong/k3.png";
import k4 from "../../../public/images/kratong/k4.png";
import k5 from "../../../public/images/kratong/k5.png";
import k6 from "../../../public/images/kratong/k6.png";
import k7 from "../../../public/images/kratong/k7.png";
import k8 from "../../../public/images/kratong/k8.png";
import "./Wave.css";

interface KatongData {
  name: string;
  wish: string;
  katong: number;
  image: string;
}

interface KatongWithStyle extends KatongData {
  styles: {
    animationDuration: string;
    animationDelay: string;
    bottom: string;
    opacity: number;
  };
}

interface WaveProps {
  katongData: KatongData[];
}

const katongImages = [k1, k2, k3, k4, k5, k6, k7, k8];

const getRandomValue = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const getRandomStyles = () => ({
  animationDuration: `${getRandomValue(15, 25)}s`,
  animationDelay: `-${getRandomValue(0, 5)}s`,
  bottom: `${getRandomValue(20, 100)}px`,
  left: `-${getRandomValue(100, 300)}px`,
  opacity: 1,
});

function getImageSrc(base64String: string): string {
  return base64String.startsWith("data:image/")
    ? base64String
    : `data:image/png;base64,${base64String}`;
}

export default function Wave({ katongData }: WaveProps) {
  const [displayData, setDisplayData] = useState<KatongWithStyle[]>([]);

  useEffect(() => {
    const getRandomKatongs = () => {
      const numberOfKatongs = Math.min(5, katongData.length);
      return katongData
        .sort(() => 0.5 - Math.random())
        .slice(0, numberOfKatongs)
        .map((item) => ({ ...item, styles: getRandomStyles() }));
    };

    const startAnimation = () => setDisplayData(getRandomKatongs());

    startAnimation();
    const animationDuration = 25000;
    const interval = setInterval(() => {
      setDisplayData((currentDisplay) => {
        const fadingDisplay = currentDisplay.map((item) => ({
          ...item,
          styles: { ...item.styles, opacity: 0 },
        }));
        setTimeout(() => startAnimation(), 1000);
        return fadingDisplay;
      });
    }, animationDuration);

    return () => clearInterval(interval);
  }, [katongData]);

  return (
    <div className="wave-container">
      <div className="katong-container">
        {displayData.map((item, index) => (
          <div
            key={`${item.name}-${index}-${Date.now()}`}
            className="katong-item"
            style={{
              ...item.styles,
              transition: "opacity 1s ease-in-out",
              zIndex: 1000 - parseInt(item.styles.bottom, 10), // คำนวณ z-index ยิ่ง bottom น้อย z-index ยิ่งสูง
            }}
          >
            <div className="katong-text">
              <p
                className="katong-wish"
                style={{
                  fontSize: item.wish.length > 20 ? "0.5rem" : "1rem", // ถ้ายาวเกิน 50 ตัวอักษร ลดขนาดตัวอักษร
                }}
              >
                {item.wish}
              </p>{" "}
              <p className="katong-name">{item.name}</p>
              
              {/* รูปภาพผู้ใช้จะถูกซ้อนด้านหน้า */}
              {/* <div className="katong-base64-image">
                <Image
                  src={getImageSrc(item.image)}
                  alt="Uploaded Katong Image"
                  width={50} 
                  height={50}
                  objectFit="cover"
                />
              </div> */}

              {/* รูปกระทงจะอยู่ด้านหลัง */}
              <div className="katong-image-container">
                <Image
                  src={katongImages[item.katong - 1]}
                  alt="Katong"
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
