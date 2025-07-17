'use client';

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Icon } from '@iconify/react';
import DotGridBackground from '../ui/dotGridBackground';
import DotGrid from '../ui/dotgridreactive';

gsap.registerPlugin(ScrollTrigger);

const PurpleSphere = ({
    top = '50px',
    left = '50px',
    width = '200px',    // Default width
    height = '200px',   // Default height
    style = {},         // Allows for additional custom inline styles
    sphereRef
}) => {
    // Combine dynamic positioning/sizing with any custom styles
    const svgStyle = {
        // position: 'absolute', // Essential for 'top' and 'left' to work
        // top: top,
        // left: left,
        width: width,
        height: height,
        ...style // Merge any additional styles passed via the 'style' prop
    };

    return (
        // Apply the dynamic style object to the SVG element
        <div className='z-50 absolute top-60'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" className="l19k0qws" style={svgStyle}>
                <g filter="url(#DarkOrb_svg__a)">
                    <circle cx="115.91" cy="135.003" r="93.184" fill="black" fillOpacity="1" style={{ fill: 'black', fillOpacity: 1 }}></circle>
                </g>
                <circle cx="100.002" cy="100.002" r="100.002" fill="url(#DarkOrb_svg__b)" fillOpacity="0.5" data-figma-bg-blur-radius="21.357"></circle>
                <mask id="DarkOrb_svg__d" width="202" height="201" x="-1" y="0" maskUnits="userSpaceOnUse" style={{ maskType: 'alpha' }}>
                    <circle cx="100" cy="100.002" r="100.002" fill="url(#DarkOrb_svg__c)"></circle>
                </mask>
                <g mask="url(#DarkOrb_svg__d)">
                    <g filter="url(#DarkOrb_svg__e)">
                        <circle cx="71.363" cy="73.638" r="44.092" fill="white" style={{ fill: 'white', fillOpacity: 1 }}></circle>
                    </g>
                    <g filter="url(#DarkOrb_svg__f)">
                        <path fill="white" fillRule="evenodd" d="M74.4342 200.458C129.664 200.458 174.436 155.686 174.436 100.456C174.436 74.7892 164.767 51.3806 148.871 33.6748C175.279 51.6752 192.619 81.9956 192.619 116.366C192.619 171.595 147.846 216.368 92.6165 216.368C63.054 216.368 36.4875 203.54 18.1797 183.147C34.207 194.072 53.5748 200.458 74.4342 200.458Z" clipRule="evenodd" style={{ fill: 'white', fillOpacity: 1 }}></path>
                    </g>
                </g>
                <defs>
                    <filter id="DarkOrb_svg__a" width="291.824" height="291.824" x="-30.002" y="-10.91" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                        <feGaussianBlur result="effect1_foregroundBlur_1016_7067" stdDeviation="26.364"></feGaussianBlur>
                    </filter>
                    <filter id="DarkOrb_svg__e" width="157.276" height="157.276" x="-7.275" y="-5" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                        <feGaussianBlur result="effect1_foregroundBlur_1016_7067" stdDeviation="17.273"></feGaussianBlur>
                    </filter>
                    <filter id="DarkOrb_svg__f" width="243.532" height="251.786" x="-16.366" y="-0.871" colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse">
                        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                        <feGaussianBlur result="effect1_foregroundBlur_1016_7067" stdDeviation="17.273"></feGaussianBlur>
                    </filter>
                    <linearGradient id="DarkOrb_svg__b" x1="77.489" x2="229.811" y1="58.897" y2="183.752" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#EAEAEA" style={{ stopColor: 'color(display-p3 0.9180 0.9180 0.9180)', stopOpacity: 1 }}></stop>
                        <stop offset="1" stopColor="#969696" style={{ stopColor: 'color(display-p3 0.5879 0.5879 0.5879)', stopOpacity: 1 }}></stop>
                    </linearGradient>
                    <linearGradient id="DarkOrb_svg__c" x1="77.487" x2="229.809" y1="58.897" y2="183.752" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#EAEAEA" style={{ stopColor: 'color(display-p3 0.9180 0.9180 0.9180)', stopOpacity: 1 }}></stop>
                        <stop offset="1" stopColor="#C4C4C4" style={{ stopColor: 'color(display-p3 0.7675 0.7675 0.7675)', stopOpacity: 1 }}></stop>
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

const WhyChoosePc = () => {
    const Container = useRef(null)
    const Container2 = useRef(null)
    const Sphere = useRef(null)
    const Grid = useRef(null)
    const Grid2 = useRef(null)
    const Text = useRef(null)

    const GE1 = useRef(null)
    const GE2 = useRef(null)
    const GE3 = useRef(null)
    const GE4 = useRef(null)
    const GE5 = useRef(null)
    const GE6 = useRef(null)
    const GE7 = useRef(null)

    useEffect(() => {
        gsap.to(Sphere.current, {
            y: -500,
            ease: "expo.out",
            duration: 0.5,
            scrollTrigger: {
                trigger: Container.current,
                start: 'top 20%',
                end: '45% 50%',
                scrub: 1
            }
        })

        gsap.to(Grid.current, {
            y: -160,
            rotateX: 0,
            ease: "expo.out",
            duration: 0.5,
            scrollTrigger: {
                trigger: Container.current,
                start: 'top 20%',
                end: '45% 50%',
                scrub: 1
            }
        })

        gsap.to(Grid2.current, {
            y: -160,
            rotateX: 0,
            ease: "expo.out",
            duration: 0.5,
            scrollTrigger: {
                trigger: Container2.current,
                start: 'top 20%',
                end: '45% 50%',
                scrub: 1
            }
        })

        gsap.to(Text.current, {
            y: -100,
            duration: 0.1,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: Container.current,
                start: 'top 20%',
                end: '40% 50%',
                scrub: 1
            }
        })

        gsap.to(".grid-fade-wrapper", {
            opacity: 0,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: Container2.current,
                start: 'top 20%',
                end: 'bottom -140%',
                scrub: 1,
                pin: true
            }
        })

        gsap.to(".grid-fade-wrapper", {
            opacity: 0,
            ease: "power4.inOut",
            scrollTrigger: {
                trigger: Container.current,
                start: 'top 20%',
                end: 'bottom top',
                scrub: 1,
                pin: true
            }
        })

        ScrollTrigger.refresh();

    }, [])

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: Container2.current,
                start: 'top 20%',
                end: '+=1800',
                scrub: 1,
                scroller: document.body
            },
        });

        ScrollTrigger.refresh();

        // Add all animations at the same time (0)
        tl.to(GE1.current, {
            x: '-312px', // -23vw
            y: '412px',  // 42.3vw
            opacity: 1,
            ease: "power4.inOut"
        }, 0)

            .to(GE2.current, {
                x: '162px',  // 35vw
                y: '222px',  // 28.3vw
                opacity: 1,
                ease: "power4.inOut"
            }, 0)

            .to(GE3.current, {
                x: '-320px', // -22.82vw
                y: '222px',  // 28.3vw
                opacity: 1,
                ease: "power4.inOut"
            }, 0)

            .to(GE4.current, {
                x: '329px',    // 0vw
                y: '-158px',   // 0.5vw
                opacity: 1,
                ease: "power4.inOut"
            }, 0)

            .to(GE5.current, {
                x: '13px',    // 0vw
                y: '-159px',   // 0.5vw
                opacity: 1,
                ease: "power4.inOut"
            }, 0)

            .to(GE6.current, {
                x: '-161px', // -11vw
                y: '-347px', // -13.5vw
                opacity: 1,
                ease: "power4.inOut"
            }, 0)

            .to(GE7.current, {
                x: '334px',  // 23vw
                y: '-347px', // -13.5vw
                opacity: 1,
                ease: "power4.inOut"
            }, 0);

        tl.to(Grid2.current, {
            y: -240,
            scale: 1.75,
            ease: "power4.inOut",
            // duration: 0.08
        }, 0.3)

        tl.to(GE3.current, {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.1
        }, 1)

        tl.to(GE5.current, {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.1
        }, 1)

        tl.to(GE6.current, {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.1
        }, 1)

        tl.to(GE7.current, {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.1
        }, 1)

        tl.to(Grid2.current, {
            y: -210,
            scale: 2.3,
            ease: "power4.inOut",
            // duration: 0.08
        }, 1)

        tl.to(GE2.current, {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.1
        }, 1.5)

        tl.to(GE4.current, {
            y: 50,
            opacity: 0,
            ease: "power1.inOut",
            duration: 0.1
        }, 1.5)

        tl.to(Grid2.current, {
            y: -360,
            scale: 3,
            scaleY: 3.5,
            ease: "power4.inOut",
            // duration: 0.08
        }, 2)

    }, [])

    return (
        <div id='how-it-works' className='w-full h-[400vh] relative items-center justify-center m-0 p-0 flex'>

            <PurpleSphere
                sphereRef={Sphere}
                width="350px"
                height="450px"
            />

            <div className='w-full h-full min-h-screen relative'>

            </div>

            <div ref={Text} className='absolute z-50 top-15'>
                <div className='flex flex-col gap-5'>
                    <div className='text-[#FFEE00] flex text-[2.5vw] md:text-xs justify-evenly w-screen items-center font-light'>
                        <p>ALL-IN-ONE TOOL</p>
                        <p>SINGLE PLATFORM</p>
                        <p>PERFECT ORGANISED</p>
                        <p>AUTOMATIC PROCESSES</p>
                    </div>

                    <div className='flex items-center justify-center w-full'>
                        <h1 className='text-center mt-10 text-[7vw] leading-10 md:leading-32 max-w-[80vw] text-[white] w-full font-[bethany]'>
                            Designed for Devs<br /> Driven by You.
                        </h1>
                    </div>
                </div>
            </div>

            <div ref={Container} style={{ perspective: "1000px" }} className='absolute top-23 md:top-63 z-10'>
                <div style={{ perspective: "1000px" }} className="grid-fade-wrapper">
                    <div ref={Grid} className='bg-[#0F1013] h-[951px] w-[800px] border-2 border-[#bebebe27] rounded-xl grid gap-1.5 p-1 grid-cols-5 grid-rows-5 rotate-x-[55deg]'>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md'>

                        </div>

                        <div className='rounded-md'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md'>

                        </div>

                        <div className='rounded-md'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>

                        <div className='rounded-md'>

                        </div>

                        <div className='rounded-md border-2 border-[#bebebe27]'>

                        </div>
                    </div>
                </div>
            </div>

            <div ref={Container2} style={{ perspective: "1000px" }} className='absolute z-10 top-23 md:top-63'>
                <div style={{ perspective: "1000px" }} className="grid-fade-wrapper2">
                    <div ref={Grid2} className='bg-transparent h-[951px] [800px] rounded-xl grid gap-1.5 p-1 grid-cols-5 grid-rows-5 rotate-x-[55deg]'>

                        <div className=''></div>
                        <div className=''></div>
                        <div className=''></div>
                        <div className=''></div>

                        <div ref={GE1} className='rounded-md border-2 bg-[#bb1bfa]'>
                            1
                        </div>

                        <div ref={GE2} className='rounded-md border-2 bg-[#bb1bfa]'>
                            2
                        </div>

                        <div className=''></div>

                        <div ref={GE3} className='rounded-md border-2 bg-[#bb1bfa]'>
                            3
                        </div>

                        <div className=''></div>
                        <div className=''></div>
                        <div className=''></div>
                        <div className=''></div>
                        <div className=''></div>
                        <div className=''></div>
                        <div className=''></div>
                        <div className=''></div>

                        <div ref={GE4} className='rounded-md border-2 bg-[#bb1bfa]'>
                            4
                        </div>

                        <div className=''></div>
                        <div className=''></div>

                        <div ref={GE5} className='rounded-md border-2 bg-[#bb1bfa]'>
                            5
                        </div>

                        <div ref={GE6} className='rounded-md border-2 bg-[#bb1bfa]'>
                            6
                        </div>

                        <div className=''></div>
                        <div className=''></div>

                        <div ref={GE7} className='rounded-md border-2 bg-[#bb1bfa]'>
                            7
                        </div>

                        <div className=''></div>
                    </div>
                </div>
            </div>

            <div className='w-full h-full inset-0 absolute z-0'>
                <DotGridBackground
                    dotSize={0.8}
                    dotColor="#ffffff65"
                    dotIntensity={4}
                />
            </div>

        </div>
    )
}

export default WhyChoosePc