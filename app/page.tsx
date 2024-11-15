"use client"
import { useState } from 'react';
import Title from './components/Title/Title';
import Wave from './components/Wave/Wave';
import { Analytics } from "@vercel/analytics/react";

interface KatongData {
  name: string;
  wish: string;
  katong: number;
  image: string;
}

export default function Home() {
  const [katongData, setKatongData] = useState<KatongData[]>([]); // ระบุประเภท KatongData[]

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Title onFetchData={(data: KatongData[]) => setKatongData(data)} /> {/* ส่งฟังก์ชันสำหรับรับข้อมูล */}
      <Wave katongData={katongData} /> {/* ส่งข้อมูลไปยัง Wave */}
      <Analytics/>
    </div>
  );
}
