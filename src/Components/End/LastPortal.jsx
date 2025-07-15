'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import EndPage from './EndPage';
import ThemeChange from './ThemeChange';
import { useThemeChange } from './ThemeChangeContext';

gsap.registerPlugin(ScrollTrigger);

const LastPortal = () => {
    const MaskRef = useRef(null);
    const containerRef = useRef(null);

    const { isThemeDark, setIsThemeDark } = useThemeChange();

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top -20%',
                end: '+=1000', // adjust based on how much scroll you want
                scrub: true,
                pin: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    if (progress > 0.63) {
                        setIsThemeDark(false); // fully scrolled
                    } else {
                        setIsThemeDark(true); // scrolled back
                    }
                }
            },
        });

        tl.to(MaskRef.current, {
            maskSize: "300vh",
            ease: "power3.inOut",
            // onComplete: () => {
            //     setIsThemeDark(false);
            // }
        });

        // tl.to(MaskRef.current, {
        //     maskSize: "2600px",
        //     ease: "power3.inOut"
        // });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <>
            <main ref={containerRef} className='main2 relative min-h-screen h-full w-full'>
                <motion.div ref={MaskRef}
                    className='mask2 z-20'
                >
                    <ThemeChange />
                </motion.div>

                <div className='body2 absolute top-0 -z-10'>
                    <EndPage />
                </div>

            </main>
        </>
    );
};

export default LastPortal;
