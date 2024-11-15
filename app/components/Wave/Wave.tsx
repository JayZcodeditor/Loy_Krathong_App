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

const katongImages = [k1, k2, k3, k4, k5, k6, k7, k8];

const getRandomValue = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
};

const getRandomStyles = () => {
    return {
        animationDuration: `${getRandomValue(15, 25)}s`,
        animationDelay: `-${getRandomValue(0, 5)}s`,
        bottom: `${getRandomValue(20, 100)}px`,
        opacity: 1
    };
};

function getImageSrc(base64String: string): string {
    if (!base64String.startsWith('data:image/')) {
        return `data:image/png;base64,${base64String}`;
    }
    return base64String;
}

export default function Wave() {
    const [allData, setAllData] = useState<KatongData[]>([]);
    const [displayData, setDisplayData] = useState<KatongWithStyle[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch all data initially
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/fetch_katong`);
                if (!response.ok) throw new Error('Failed to fetch data');
                const result = await response.json();

                if (Array.isArray(result.data)) {
                    setAllData(result.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Get random katongs
    const getRandomKatongs = () => {
        if (allData.length === 0) return [];

        const numberOfKatongs = Math.min(5, allData.length);
        const shuffled = [...allData].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, numberOfKatongs);

        return selected.map(item => ({
            ...item,
            styles: getRandomStyles()
        }));
    };

    // Update display data periodically
    useEffect(() => {
        if (isLoading) return;

        // Initial display
        setDisplayData(getRandomKatongs());

        // Set interval for random updates
        const interval = setInterval(() => {
            const currentDisplay = displayData;

            // Fade out current katongs
            const fadingDisplay = currentDisplay.map(item => ({
                ...item,
                styles: { ...item.styles, opacity: 0 }
            }));
            setDisplayData(fadingDisplay);

            // Show new katongs after fade out
            setTimeout(() => {
                setDisplayData(getRandomKatongs());
            }, 1000);
        }, 10000); // Update every 10 seconds

        return () => clearInterval(interval);
    }, [isLoading, allData]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="wave-container">
            {/* SVG Wave Background */}
            {/* <svg
                className="waves"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 150 28"
                preserveAspectRatio="none"
                shapeRendering="auto"
            >
                <defs>
                    <path
                        id="gentle-wave"
                        d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                    />
                </defs>
                <g className="parallax">
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                </g>
            </svg> */}

            {/* Kratong Container */}
            <div className="katong-container">
                {displayData.map((item, index) => (
                    <div
                        key={`${item.name}-${index}-${Date.now()}`}
                        className="katong-item border"
                        style={{
                            ...item.styles,
                            transition: 'opacity 1s ease-in-out'
                        }}
                    >
                        <div className="katong-text">
                            <p className="font-bold">{item.name}</p>
                            <p>{item.wish}</p>
                            <div className="katong-base64-image">
                                <Image
                                    src={getImageSrc(item.image)}
                                    alt="Uploaded Katong Image"
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                />
                            </div>
                        </div>
                        <Image
                            src={katongImages[item.katong - 1]}
                            alt="Katong"
                            width={100}
                            height={100}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}