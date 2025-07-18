"use client";
import React, { useRef } from 'react'
import Lanyard from './Lanyard';
import DotGridBackground from '../ui/dotGridBackground';
import DotGrid from '../ui/dotgridreactive';
import FlipLink from '../NavBar/FlipLinks';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

// This component wraps your text and applies a staggered animation to each letter.
const AnimatedText = ({
    text,
    el: Wrapper = 'p',
    className,
    style,
    stagger = 0.08
}) => {
    const ref = useRef(null);
    // MODIFICATION: Removed `once: true` to allow the animation to repeat.
    const isInView = useInView(ref, { margin: "-100px 0px" });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: stagger,
            },
        },
    };

    const letterVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: 'spring',
                damping: 15,
                stiffness: 200,
            },
        },
    };

    return (
        <Wrapper className={className} style={style} ref={ref}>
            <motion.span
                className="inline-block"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                aria-label={text}
            >
                {text.split('').map((letter, index) => (
                    <motion.span
                        key={index}
                        variants={letterVariants}
                        className="inline-block"
                    >
                        {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                ))}
            </motion.span>
        </Wrapper>
    );
};

const FooterColumn = ({ title, links }) => {
    // Variants for the column itself to fade in.
    const columnVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    // Variants for the list to stagger its children (the links).
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06, // Stagger for links within a column
                delayChildren: 0.2, // Delay after the title appears
            },
        },
    };

    // Variants for each link item.
    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <motion.div variants={columnVariants}>
            <motion.h3
                className="mb-4 font-bold tracking-wide text-gray-900 uppercase"
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >
                {title}
            </motion.h3>
            <motion.ul
                className="space-y-2"
                variants={listVariants}
            >
                {links.map((link) => (
                    <motion.li key={link.name} variants={itemVariants}>
                        <a href={link.href || '#'} className="text-gray-700 transition-colors duration-300 hover:underline hover:text-black">
                            {link.name}
                        </a>
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
};


const Footer = () => {
    const sections = {
        Product: [
            { name: 'Dashboard' },
            { name: 'Contributor Profile' },
            { name: 'Projects' },
            { name: 'Rewards' },
            { name: 'Contribution Requests' },
            { name: 'My Projects' },
            { name: 'Issues' },
        ],
        Resources: [
            { name: 'Docs' },
            { name: 'FAQs' },
            { name: 'Pricing' },
        ],
        Company: [
            { name: 'About Us' },
            { name: 'LinkedIn' },
            { name: 'Twitter' },
            { name: 'Contact Us' },
        ],
        Developers: [
            { name: 'Developer GitHubs' },
            { name: 'Developer Twitters' },
            { name: 'Developer LinkedIn' },
        ],
        Content: [
            { name: 'Terms of Use' },
            { name: 'Privacy Policy' },
        ]
    };

    const ref = useRef(null);
    // MODIFICATION: Removed `once: true` to allow the animation to repeat.
    const isInView = useInView(ref, { margin: "-150px 0px" });

    // Variants to control the staggering of the columns.
    const gridContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                // This is where you configure the column-by-column stagger.
                staggerChildren: 0.15, // Adjust this value for faster/slower column animation
            },
        },
    };

    return (
        <div className='md:min-h-[73vh] min-h-[60vh] bg-[#fffafa] w-full relative select-none overflow-hidden z-20'>

            <div className='w-full h-full'>
                <div className='w-[90vw] md:h-[0.15vh] h-[0.2vh] bg-[#09090b] absolute top-[0.4px] left-[4.7vw]'></div>
            </div>
            <div className="flex">
                <div className='w-full px-8 pt-9 pb-24 md:w-[70vw] md:pl-32'>
                    {/* --- THIS IS THE ANIMATED GRID CONTAINER --- */}
                    <motion.div
                        ref={ref}
                        className="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:grid-cols-5"
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    >
                        {Object.entries(sections).map(([title, links]) => (
                            <FooterColumn key={title} title={title} links={links} />
                        ))}
                    </motion.div>
                </div>
                <div className='absolute right-0 w-[30vw] top-[-30vh] h-screen hidden md:flex items-end z-50 justify-end'>
                    <Lanyard position={[0, 0, 22]} gravity={[0, -60, 0]} />
                </div>
            </div>


            <div className='absolute right-0 w-[35vw] top-[-25vh] h-screen md:hidden flex items-end z-50 justify-end'>
                <Lanyard position={[0, 0, 35]} gravity={[0, -60, 0]} />
            </div>

            {/* <div className='absolute top-[-1.8vh] z-[52] right-[16.5vw] m-0 p-0 rotate-180'>
                <PurpleSphere width='110px' height='110px' />
            </div> */}

            {/* <div className='z-10 absolute md:bottom-[16vh] bottom-[3vh] leading-0 w-full'>
                <h1 style={{ fontFamily: 'var(--font-cypher)' }} className='text-black text-[18vw] z-50 font-bold text-center w-full scale-y-150'>neoweave</h1>
            </div> */}

            <div className='absolute z-10 md:-bottom-[2vh] bottom-[3vh] leading-none w-full flex justify-center'>
                <AnimatedText
                    text="neoweave"
                    el="h1"
                    className='text-black text-[18vw] z-50 font-bold text-center scale-y-150'
                    style={{ fontFamily: 'var(--font-cypher), sans-serif' }}
                    stagger={0.12}
                />
            </div>

            <div className='w-full h-full'>
                <div className='w-[90vw] md:h-[0.15vh] h-[0.2vh] bg-[#09090b] absolute bottom-[0.4px] left-[4.7vw]'></div>
            </div>

            <div className='w-full h-full inset-0 absolute z-0'>
                <DotGridBackground
                    dotSize={0.8}
                    dotColor="#eea215"
                    dotIntensity={4}
                />
            </div>
        </div>
    )
}

export default Footer
