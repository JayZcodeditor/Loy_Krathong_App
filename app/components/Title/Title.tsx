import React from 'react'
import Image from 'next/image'
import title from '../../../public/images/title/Title.png'

function Title() {
    return (
        <div className='flex justify-center p-5'>
            <Image
                src={title}
                width={800}
                height={50}
                alt="title"
                className='rounded-lg'
                priority
            />
        </div>
    )
}

export default Title