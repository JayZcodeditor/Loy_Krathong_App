// pages/WavePage.tsx

"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import k1 from '../../../public/images/kratong/k1.png';
import k2 from '../../../public/images/kratong/k2.png';
import k3 from '../../../public/images/kratong/k3.png';
import k4 from '../../../public/images/kratong/k4.png';
import k5 from '../../../public/images/kratong/k5.png';
import k6 from '../../../public/images/kratong/k6.png';
import k7 from '../../../public/images/kratong/k7.png';
import k8 from '../../../public/images/kratong/k8.png';
import "./Wave.css";
import { apiUrl } from '@/app/config/apisetting';

interface KatongData {
    name: string;
    wish: string;
    katong: number;
    image: string; // Base64
}

const katongImages = [k1, k2, k3, k4, k5, k6, k7, k8];

export default function Wave() {
    const [data, setData] = useState<KatongData[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/fetch_katong`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const result = await response.json();
    
                if (Array.isArray(result.data)) {
                    setData(result.data.slice(-5));
                } else {
                    console.error("Data is not an array:", result.data);
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    function getImageSrc(base64String: string): string {
        // ตรวจสอบว่า base64String มี prefix ที่จำเป็นหรือไม่
        if (!base64String.startsWith('data:image/')) {
            // สมมติว่าภาพเป็น PNG ถ้าไม่มี prefix
            return `data:image/png;base64,${base64String}`;
        }
        return base64String;
    }
    
    
    return (
        <div className="wave-container">
           <div className="katong-container">
                {data.map((item, index) => {
                    const imageIndex = (item.katong - 1) % katongImages.length;
                    const base64Image = getImageSrc(item.image);

                    return (
                        <div key={index} className="flex katong-item justify-between border border-red-500" style={{ animationDelay: `${index * 2}s` }}>
                            <div className="katong-text">
                                <p><strong>{item.name}</strong></p>
                                <p>{item.wish}</p>
                                <div className="katong-base64-image">
                                    <Image 
                                        src={base64Image} 
                                        alt="Uploaded Katong Image" 
                                        width={100} 
                                        height={100} 
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                            <Image 
                                src={katongImages[imageIndex]} 
                                alt="Katong" 
                                width={100} 
                                height={100} 
                            />
                            
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

