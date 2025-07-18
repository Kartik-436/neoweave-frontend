'use client';
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'framer-motion';
import DotGridBackground from '../ui/dotGridBackground';
import DotGrid from './../ui/dotgridreactive';
import StaggeredTextButton from '../StaggeredButton';

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

const AnimatedText = ({ text, el: Wrapper = 'p', className, style, stagger = 0.03 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px 0px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: stagger } },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100 } },
    };

    return (
        <Wrapper className={className} style={style} ref={ref}>
            {text.split(' ').map((word, index) => (
                <motion.span
                    key={index}
                    className="inline-block"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    aria-hidden="true" // Hide from screen readers to prevent double reading
                >
                    <motion.span variants={wordVariants} className="inline-block mr-[0.25em]">
                        {word}
                    </motion.span>
                </motion.span>
            ))}
        </Wrapper>
    );
};


const FinalPage = () => {
    const ballRefs = useRef([]);
    const textRef = useRef(null);
    const Notiref1 = useRef(null)
    const Notiref2 = useRef(null)
    const registerSectionRef = useRef(null);

    // This ref is for the container of the "Register Now" section to trigger its animation
    const registerIsInView = useInView(registerSectionRef, { margin: "0px 0px" });

    // GSAP Animations
    useEffect(() => {
        // --- FIX: Create a context for this component's GSAP animations ---
        let ctx = gsap.context(() => {
            // Floating balls animation
            ballRefs.current.forEach((ball) => {
                if (ball) floatBall(ball);
            });

            // Word-by-word color scroll animation
            const words = gsap.utils.toArray('.scroll-word');
            gsap.set(words, { color: '#dbcaab' });

            let tl = gsap.timeline({
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top top',
                    end: `bottom 30%`,
                    scrub: 1,
                    pin: true,
                },
            });

            words.forEach((word, i) => {
                tl.to(word, { color: '#09090b', duration: 0.3, ease: 'power1.in' }, i * 0.15);
            });

            // Parallax scroll for the notification-like element
            gsap.to(Notiref2.current, {
                y: 40,
                scrollTrigger: {
                    trigger: Notiref1.current,
                    start: "start 60%",
                    end: "50% 65%",
                    scrub: 1,
                }
            });
        });

        // --- FIX: The cleanup function now only reverts animations created within this context ---
        return () => ctx.revert();

    }, []);

    const floatBall = (ball) => {
        gsap.to(ball, {
            x: gsap.utils.random(-40, 40),
            y: gsap.utils.random(-40, 40),
            duration: gsap.utils.random(2, 4),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });
    };

    const paragraph = "Designed to let you focus on your work and earn crypto.";

    // Framer Motion Variants for the "Register Now" section
    const registerContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3, // This creates the stagger between the string and the text/button group
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    const lastref = useRef(null);
    const lastrefisInView = useInView(lastref, { margin: "-100px 0px" });

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
                            {/* <DotGrid
                                dotSize={0.8}
                                gap={20}
                                baseColor="#ffffff65"
                                activeColor="#9D00FF"
                                proximity={170}
                            /> */}
                            <DotGridBackground
                                dotSize={0.8}
                                dotColor="#ffffff65"
                                dotIntensity={4}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/** "Register Now" Section with Stagger Animation (Framer Motion) */}
            <motion.div
                ref={registerSectionRef}
                className='absolute bottom-[50vh] left-0 z-50 flex flex-col items-center w-full min-h-[50vh] justify-center'
                variants={registerContainerVariants}
                initial="hidden"
                animate={registerIsInView ? "visible" : "hidden"}
            >
                {/* Child 1: The String */}
                <motion.div variants={itemVariants} className="w-full">
                    <div className='md:flex hidden'><StringAnimation2 /></div>
                    <div className='flex md:hidden w-full h-[0.3vh] bg-[#dbcaab] relative top-[10vh] left-0 mx-auto w-[80vw]'></div>
                </motion.div>

                {/* Child 2: The Text and Button group */}
                <motion.div variants={itemVariants} className='flex flex-col items-center justify-center w-full mt-[-21vh] md:mt-[-5.5vh] gap-[3vh] md:gap-[11vh]'>
                    <AnimatedText
                        text="Register Now to earn crypto for open source."
                        el="h1"
                        className='md:text-5xl text-[8vw] font-[Marcellus] font-semibold w-full text-center pointer-events-none z-0'
                        stagger={0.04}
                    />
                    {/* <button className='md:px-13 px-10 md:py-7 py-5 bg-[#a305ff] text-white text-2xl cursor-pointer font-semibold font-[Inter] rounded-full'>
                        Register
                    </button> */}

                    <StaggeredTextButton
                        text="Register"
                        hoverText="Let&apos;s Go"
                        className='text-white text-[1.4vw] hover:shadow-[0_0_30px_5px] hover:shadow-[#a200ff] rounded-full px-13 py-7 bg-[#a200ff] cursor-pointer transition-all duration-700'
                    />
                </motion.div>
            </motion.div>

            {/** Bottom Text Section with Fade-in Animation (Framer Motion) */}
            <div
                ref={lastref}
                initial="hidden"
                animate={lastrefisInView ? "visible" : "hidden"}
                className='w-full flex md:flex-row flex-col md:justify-between md:items-end items-start justify-start absolute md:bottom-5 bottom-8 md:px-[12vh] px-5'
            >
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={lastrefisInView ? "visible" : "hidden"}
                    className='overflow-hidden'
                >
                    <h1 className='md:text-6xl text-5xl font-[Marcellus] font-semibold'>Organised.</h1>
                </motion.div>
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={lastrefisInView ? "visible" : "hidden"}
                    className='overflow-hidden'
                >
                    <h1 className='md:text-2xl text-xl font-[Marcellus] font-medium'>So you don't have to be.</h1>
                </motion.div>
            </div>

            {/* Background DotGrid */}
            <div className='w-full h-full inset-0 absolute z-0'>
                <DotGridBackground
                    dotSize={0.8}
                    dotColor="#eea215"
                    dotIntensity={4}
                />
            </div>
        </div>
    );
};

export default FinalPage;
