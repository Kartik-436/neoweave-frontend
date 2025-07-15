"use client";
import React from 'react'
import Lanyard from './Lanyard';

const PurpleSphere = ({   // Default left position
    width = '200px',    // Default width
    height = '200px',   // Default height
    style = {},          // Allows for additional custom inline styles
    sphereRef
}) => {
    // Combine dynamic positioning/sizing with any custom styles
    const svgStyle = {
        width: width,
        height: height,
        ...style // Merge any additional styles passed via the 'style' prop
    };

    return (
        // Apply the dynamic style object to the SVG element
        <div className='z-52'>
            <svg ref={sphereRef} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={svgStyle}>
                <defs>
                    {/* Radial gradient for the sphere's main color and depth */}
                    <radialGradient id="purpleSphereGradient" cx="30%" cy="30%" r="70%" fx="30%" fy="30%">
                        <stop offset="0%" stopColor="#e0b0ff" /> {/* Lighter purple for highlight area */}
                        <stop offset="50%" stopColor="#8a2be2" /> {/* Medium purple */}
                        <stop offset="100%" stopColor="#5a0090" /> {/* Darker purple for edges */}
                    </radialGradient>

                    {/* Radial gradient for the specular highlight */}
                    <radialGradient id="sphereHighlight" cx="35%" cy="25%" r="30%" fx="35%" fy="25%">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.8)" />
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                    </radialGradient>

                    {/* Filter for the shadow blur */}
                    <filter id="shadowBlur" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
                        <feOffset dx="0" dy="5" result="offsetblur" />
                        <feMerge>
                            <feMergeNode in="offsetblur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Shadow - a blurred ellipse positioned below the sphere */}
                <ellipse cx="100" cy="180" rx="60" ry="10" fill="rgba(0, 0, 0, 0.2)" filter="url(#shadowBlur)" />

                {/* Sphere body */}
                <circle cx="100" cy="100" r="80" fill="url(#purpleSphereGradient)" />

                {/* Specular Highlight */}
                <circle cx="90" cy="80" r="50" fill="url(#sphereHighlight)" />

                {/* Small, sharp highlight for extra shine */}
                <circle cx="75" cy="70" r="10" fill="rgba(255, 255, 255, 0.9)" />
            </svg>
        </div>
    );
};

const Footer = () => {
    return (
        <div className='md:min-h-[73vh] min-h-[60vh] bg-[#fffafa] w-full relative select-none overflow-hidden z-20'>

            {/* <div className='z-20 absolute bottom-[40vh] left-0'>
                <StringAnimation />
            </div>

            <div className='z-20 absolute top-0 left-0'>
                <StringAnimation />
            </div> */}

            <div className='w-full h-full'>
                <div className='w-[90vw] md:h-[0.15vh] h-[0.2vh] bg-[#09090b] absolute top-[0.4px] left-[4.7vw]'></div>
            </div>

            <div>

            </div>

            <div className='absolute right-0 w-[30vw] top-[-30vh] h-screen hidden md:flex items-end z-50 justify-end'>
                <Lanyard position={[0, 0, 22]} gravity={[0, -60, 0]} />
            </div>

            <div className='absolute right-0 w-[35vw] top-[-25vh] h-screen md:hidden flex items-end z-50 justify-end'>
                <Lanyard position={[0, 0, 35]} gravity={[0, -60, 0]} />
            </div>

            {/* <div className='absolute top-[-1.8vh] z-[52] right-[16.5vw] m-0 p-0 rotate-180'>
                <PurpleSphere width='110px' height='110px' />
            </div> */}

            <div className='z-10 absolute md:bottom-[16vh] bottom-[3vh] leading-0 w-full'>
                <h1 style={{ fontFamily: 'var(--font-cypher)' }} className='text-black text-[18vw] z-50 font-bold text-center w-full scale-y-150'>neoweave</h1>
                {/*parkinsans, Barlow, Montserrat, Raleway, */}

                {/* <Image alt="Font Image" src="/gitlogo.svg" width={2000} height={2000} /> */}
            </div>

            <div className="relative h-[700px]  w-full  overflow-hidden border">

            </div>
        </div>
    )
}

export default Footer
