import React from 'react'
import "./Wave.css"
function Wave() {
    return (
        <div >
            <svg
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
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255, 140, 0, 0.7)" />
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255, 140, 0, 0.7)" />
                    <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255, 140, 0, 0.7)" />
                    <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255, 69, 0, 0.5)" />
                    <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255, 99, 71, 0.3)" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgb(255, 127, 80)" />
                </g>
            </svg>
        </div>
    )
}

export default Wave