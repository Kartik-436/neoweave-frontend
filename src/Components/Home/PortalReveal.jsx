'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Page2 from './Page2';
import Particles from './particle';
import { useThemeChange } from '../End/ThemeChangeContext';

gsap.registerPlugin(ScrollTrigger);

const MaskedPage = () => {
    const mainContainer = useRef(null);
    const maskRef = useRef(null);
    const sphereRef = useRef(null);
    const contentRef = useRef(null);
    const textRef1 = useRef(null);
    const textRef2 = useRef(null);

    const { isLoaded } = useThemeChange();

    useEffect(() => {
        // gsap.context() is crucial for React. It scopes the animations to this component
        // and provides a cleanup function (ctx.revert()) that won't affect other components.
        const ctx = gsap.context(() => {
            if (!isLoaded) return;

            // This timeline runs the initial "load-in" animation.
            const loadTl = gsap.timeline({
                // The onComplete callback is the key. It ensures the ScrollTrigger
                // is created only AFTER the loading animation is 100% finished.
                onComplete: () => {
                    // Now we create the scroll-based animation timeline.
                    const scrollTl = gsap.timeline({
                        scrollTrigger: {
                            trigger: mainContainer.current,
                            start: 'top top',
                            end: '+=4000',
                            scrub: 1,
                            pin: true,
                            //  THE FIX: Using 'transform' for pinning is less disruptive
                            //  to the page layout and prevents interference with other
                            //  ScrollTriggers on the same page.
                            pinType: 'transform',
                        },
                    });

                    // Add animations to the scroll timeline
                    scrollTl.to(contentRef.current, { y: -500, rotateX: -50, autoAlpha: 0 }, "start")
                        .to(sphereRef.current, { y: -100, x: -200, rotate: 90, scale: 1.2, z: 100 }, "start")
                        .to(textRef1.current, { autoAlpha: 1, x: 0 }, "start+=0.2")
                        .to(textRef1.current, { autoAlpha: 0 }, "middle")
                        .to(sphereRef.current, { y: -50, x: 170, rotate: -90, scale: 0.8 }, "middle")
                        .to(textRef2.current, { autoAlpha: 1, x: 0 }, "middle+=0.2")
                        .to(textRef2.current, { autoAlpha: 0 }, "end")
                        .to(sphereRef.current, { y: 60, x: 0, rotate: 0, scale: 0.2 }, "end")
                        .to(maskRef.current, { '--mask-size': '300vh', ease: "power1.inOut" }, "reveal")
                        .to(sphereRef.current, { scale: 2, y: -300, autoAlpha: 0 }, "reveal");

                    // It's good practice to refresh ScrollTrigger after setting up complex timelines
                    ScrollTrigger.refresh();
                }
            });

            // Set initial states for all animated elements before the load animation begins.
            // Using autoAlpha is better than opacity as it also toggles visibility.
            loadTl.set(sphereRef.current, { y: 500, scale: 0.5, autoAlpha: 0 });
            loadTl.set(contentRef.current, { y: -200, autoAlpha: 0 });
            loadTl.set(textRef1.current, { autoAlpha: 0, x: 50 });
            loadTl.set(textRef2.current, { autoAlpha: 0, x: -50 });

            // Run the load-in animation
            loadTl.to(sphereRef.current, { y: 0, scale: 1, autoAlpha: 1, duration: 1.2, ease: "power3.out" })
                .to(contentRef.current, { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }, "-=0.8");

        }, mainContainer); // Scope all GSAP selectors and animations to the main container

        // Cleanup function that runs when the component unmounts.
        // ctx.revert() safely kills only the animations created within this context.
        return () => ctx.revert();
    }, [isLoaded]);

    return (
        <>
            <main ref={mainContainer} className='main relative h-screen w-full'>
                <div ref={maskRef} className='mask z-10 select-none'>
                    <Page2 />
                </div>

                <div className='body fixed top-0 left-0 -z-10 w-full h-screen'>
                    <div style={{ perspective: "2000px" }} className="relative w-full h-screen flex items-center justify-center overflow-hidden">

                        <div ref={sphereRef} id='SPHERE' className='absolute w-full z-50 h-screen flex items-end justify-center pointer-events-none'>
                            <div className="absolute top-[57%] w-[1034px] h-[1000px] rounded-full bg-[#4F46E5] z-10 blur-2xl " />
                            <div className="absolute top-[48%] w-[1000px] h-[1000px] rounded-full bg-[#A78BFA] z-[5] blur-2xl" />
                            <div className="absolute top-[65%] w-[1050px] h-[1000px] rounded-full bg-[#09090b] z-30 blur-[60px]" />
                            <div className="absolute top-[48%] w-[1020px] h-[1020px] rounded-full bg-[#A78BFA]" />
                            <div className="absolute top-[48%] w-[1010px] h-[1000px] rounded-full z-50 bg-transparent border-8 border-[#A78BFA]/50 blur-[1px]" />
                            <div className='absolute top-[84%] w-[1300px] h-[800px] rounded-full bg-black z-20 blur-[100px]'></div>
                        </div>

                        <div ref={contentRef} className="flex mt-6 flex-col gap-5 text-white absolute top-32 md:top-35 z-50 items-center justify-center pointer-events-none">
                            <div className='backdrop-blur bg-white/10 rounded-full px-4 py-2 text-sm md:text-base'>
                                Trusted. Transparent. Blockchain-Powered.
                            </div>
                            <div className="md:text-[96px] text-[50px] max-w-[80vw] md:max-w-[70vw] text-center leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#C1C1DF] from-55% to-[#333352] to-95% font-[Lato] font-semibold">
                                Earn Crypto by Solving <br /> Open Source
                            </div>
                        </div>

                        <div className='absolute bg-[#4f46e5]/60 h-20 w-80 z-0 bottom-33 blur-[80px]'></div>
                        <div className='h-[25vh] rounded-full w-[66vw] bottom-60 absolute bg-[#4f46e5]/40 blur-[110px] pointer-events-none'></div>
                        <div className='h-[30vh] rounded-full w-[50vw] bottom-30 left-50 absolute bg-[#4f46e5]/40 blur-[110px] pointer-events-none'></div>
                        <div className='bg-gradient-to-b from-transparent via-black/50 to-black h-[40vh] w-full absolute bottom-0 z-40 pointer-events-none'></div>
                        <div className='bg-black blur-[35px] absolute bottom-80 w-56 h-8 z-40 pointer-events-none'></div>
                        <div className='bg-[#C776F6] h-[15vh] w-[57vw] absolute -top-27 left-57 rotate-[11.06deg] blur-[120px] pointer-events-none'></div>

                        <div className='z-5 absolute inset-0 left-10 w-screen h-screen pointer-events-none'>
                            <Particles />
                        </div>

                        <div ref={textRef1} className='absolute flex flex-col gap-5 items-start p-5 md:left-[48vw] md:max-w-[44vw] z-50 top-1/2 -translate-y-1/2 left-[5vw] max-w-[90vw]'>
                            <h1 className='md:text-[4.4vw] text-[12vw] text-transparent bg-clip-text bg-gradient-to-r from-[#C1C1DF] from-55% to-[#333352] to-95% font-[Lato] font-semibold text-nowrap'>What is Neoweave?</h1>
                            <p className='md:text-[1.1vw] text-[4vw] text-white font-[inter]'>Neoweave is a blockchain platform that connects open-source software development with decentralized finance (DeFi), creating a trustless bounty system for code contributions and help solve real life problems by allowing connectivity and seamless transactions between developers all over the globe.</p>
                        </div>

                        <div ref={textRef2} className='absolute left-[10vw] md:max-w-[44vw] flex flex-col gap-6 z-50 top-1/2 -translate-y-1/2'>
                            <p className='md:text-[1.4vw] text-[4vw] text-white font-[inter]'>We are thrilled to welcome you to a global community where open-source meets the power of decentralized finance. Whether you&apos;re here to fund innovation or earn crypto for your code, you&apos;re stepping into a transparent, trustless ecosystem where real contributions are rewarded.</p>
                            <p className='md:text-[1.6vw] text-[4.6vw] text-white font-[inter]'>Let&apos;s build the future of software—together.</p>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default MaskedPage;