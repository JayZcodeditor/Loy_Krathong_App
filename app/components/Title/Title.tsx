import React from 'react'
import Image from 'next/image'
import title from '../../../public/images/title/Title.png'

function Title() {
    return (
        <div className="flex flex-col items-center p-5 space-y-10">
            <Image
                src={title}
                width={800}
                height={50}
                alt="title"
                className="rounded-lg"
                priority
            />
            <div className="flex flex-col justify-center items-center space-x-5 w-full">
                <span>จำนวนธงที่มีการสร้างขึ้น</span>
                <button className="bg-white rounded-lg p-2 text-2xl hover:bg-gray-100 transition-colors mt-9">
                    สร้างกระทง
                </button>
            </div>
        </div>
    )
}

export default Title
