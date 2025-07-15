'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const StringAnimation2 = () => {
    const string1Ref = useRef(null);
    const defaultPath = "M 100 100 Q 700 100 1350 100";
    const [isMouseOver, setIsMouseOver] = useState(false);

    useEffect(() => {
        const handleMouseMove = (event) => {
            setIsMouseOver(true);
            const svgElement = string1Ref.current.querySelector('svg');
            if (svgElement) {
                const boundingBox = svgElement.getBoundingClientRect();
                const relativeX = event.clientX - boundingBox.left;
                const relativeY = event.clientY - boundingBox.top;

                const newPath = `M 100 100 Q ${relativeX} ${relativeY} 1350 100`;

                gsap.to(svgElement.querySelector('path'), {
                    attr: { d: newPath },
                    duration: 0.6,
                    ease: 'power3.out',
                });
            }
        };

        const handleMouseLeave = () => {
            setIsMouseOver(false);
            gsap.to(string1Ref.current.querySelector('svg path'), {
                attr: { d: defaultPath },
                duration: 3,
                ease: 'elastic.out(0.85, 0.11)',
            });
        };

        const string1Element = string1Ref.current;

        if (string1Element) {
            string1Element.addEventListener('mousemove', handleMouseMove);
            string1Element.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            if (string1Element) {
                string1Element.removeEventListener('mousemove', handleMouseMove);
                string1Element.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    return (
        <div>
            <div ref={string1Ref} id="string1" className='lg:flex items-center justify-center h-[6vh] overflow-visible z-[5] hidden mb-8'>
                <svg id="str1" width="1440" height="200" className='z-[5]'>
                    <path d="M 100 100 Q 700 100 1350 100" stroke={"#dbcaab"} strokeWidth={2} fill="transparent" />
                </svg>
            </div>
        </div>
    )
}

const FinalPage = () => {
    const ballRefs = useRef([]);
    const textRef = useRef(null);

    const Notiref1 = useRef(null)
    const Notiref2 = useRef(null)

    useEffect(() => {
        // Floating balls animation
        ballRefs.current.forEach((ball) => {
            floatBall(ball);
        });

        // Word-by-word color scroll animation
        const words = gsap.utils.toArray('.scroll-word');
        gsap.set(words, { color: '#dbcaab' });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef.current,
                start: 'top top',
                end: `bottom 30%`, // Enough space for word-by-word
                scrub: 1,
                pin: true,
            },
        });

        words.forEach((word, i) => {
            tl.to(word, {
                color: '#09090b',
                duration: 0.3,
                ease: 'power1.in',
            }, i * 0.15);
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    useEffect(() => {
        gsap.to(Notiref2.current, {
            y: 40,
            scrollTrigger: {
                trigger: Notiref1.current,
                start: "start 60%",
                end: "50% 65%",
                scrub: 1,
            }
        })
    }, [])


    const floatBall = (ball) => {
        const duration = gsap.utils.random(1, 3, 0.1);
        const deltaX = gsap.utils.random(-40, 40);
        const deltaY = gsap.utils.random(-40, 40);
        gsap.to(ball, {
            x: deltaX,
            y: deltaY,
            duration,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });
    };

    const paragraph = "Designed to let you focus on your work and earn crypto.";

    return (
        <div className='min-h-[350vh] w-full bg-[#fffafa] z-10 overflow-hidden relative'>
            {/** Floating Balls */}
            <div ref={(el) => (ballRefs.current[0] = el)}
                className={'h-22 w-22 md:h-35 md:w-35 bg-white shadow-xl absolute z-50 rounded-full flex items-center justify-center top-[130vh] left-[80%]'}
            >
                <div className="bg-[#33333346] h-[128px] w-[128px] rounded-full blur-lg"></div>
                <div className="bg-[#ffffffc5] h-10 w-10 rounded-full blur-md absolute"></div>
            </div>

            <div ref={(el) => (ballRefs.current[1] = el)}
                className={'h-27 w-27 md:h-40 md:w-40 bg-white shadow-xl absolute z-50 rounded-full flex items-center justify-center top-[83vh] left-[80%]'}
            >
                <div className="bg-[#33333346] h-[128px] w-[128px] rounded-full blur-lg"></div>
                <div className="bg-[#ffffffc5] h-10 w-10 rounded-full blur-md absolute"></div>
            </div>

            <div ref={(el) => (ballRefs.current[2] = el)}
                className={'h-27 w-27 md:h-40 md:w-40 bg-white shadow-xl absolute z-50 rounded-full flex items-center justify-center top-[132vh] left-[11%]'}
            >
                <div className="bg-[#33333346] h-[128px] w-[128px] rounded-full blur-lg"></div>
                <div className="bg-[#ffffffc5] h-10 w-10 rounded-full blur-md absolute"></div>
            </div>

            <div ref={(el) => (ballRefs.current[3] = el)}
                className={'h-36 md:h-46 w-36 md:w-46 bg-white shadow-xl absolute z-50 rounded-full flex items-center justify-center top-[65vh] left-[20%]'}
            >
                <div className="bg-[#33333346] h-[128px] w-[128px] rounded-full blur-lg"></div>
                <div className="bg-[#ffffffc5] h-10 w-10 rounded-full blur-md absolute"></div>
            </div>

            {/** Animated Gradient Text */}
            <div
                ref={textRef}
                className='md:text-[5.6vw] text-[11vw] max-w-[80vw] md:max-w-[50vw] mt-[40vh] md:leading-[1.2] text-center font-medium mx-auto md:py-[20vh] py-[30vh] font-[Poppins] z-20'
            >
                {paragraph.split(' ').map((word, i) => (
                    <motion.span
                        key={i}
                        className="scroll-word inline-block mr-[1.2vw] z-20"
                        initial={{ color: '#dbcaab' }}
                    >
                        {word}
                    </motion.span>
                ))}
            </div>

            <div className='w-full flex items-center justify-center mt-[20vh] z-50 mb-[120vh]'>
                <div ref={Notiref1} className='bg-transparent h-[60vh] w-[90vw] md:w-[80vw] flex items-start justify-center rounded-full border-2 border-[#dbcaab]'>
                    <div ref={Notiref2} className='bg-[#09090b] h-[54vh] w-[90vw] md:w-[80vw] rounded-full z-50'>
                        <div className='w-full h-full inset-0 absolute z-0'>

                        </div>
                    </div>
                </div>
            </div>

            <div className='absolute bottom-[50vh] left-0 z-50 flex flex-col items-center w-full min-h-[50vh] justify-center'>
                <div className='md:flex hidden'>
                    <StringAnimation2 />
                </div>

                <div className='flex md:hidden w-full'>
                    <div className='w-[80vw] h-[0.3vh] bg-[#dbcaab] absolute top-0 left-[10vw]'></div>
                </div>

                <div className='flex flex-col items-center justify-center w-full mt-[-21vh] md:mt-[-5.5vh] gap-[3vh] md:gap-[11vh]'>
                    <h1 className='md:text-5xl text-[8vw] font-[Marcellus] font-semibold w-full text-center pointer-events-none z-0'>
                        Register Now to earn crypto for open source.
                    </h1>

                    <button className='md:px-13 px-10 md:py-7 py-5 bg-[#a305ff] text-white text-2xl cursor-pointer font-semibold font-[Inter] rounded-full'>
                        Register
                    </button>
                </div>
            </div>

            <div className='w-full flex md:flex-row flex-col md:justify-between md:items-end items-start justify-start absolute md:bottom-5 bottom-8 md:px-[12vh] px-5'>
                <h1 className='md:text-6xl text-5xl font-[Marcellus] font-semibold'>Organised.</h1>
                <h1 className='md:text-2xl text-xl font-[Marcellus] font-medium'>So you don't have to be.</h1>
            </div>

            {/* Background DotGrid */}
            <div className='w-full h-full inset-0 absolute z-0'>

            </div>
        </div>
    );
};

export default FinalPage;
