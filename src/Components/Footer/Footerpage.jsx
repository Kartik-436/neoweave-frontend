"use client";
import React, { useRef } from 'react'
import Lanyard from './Lanyard';
import DotGridBackground from '../ui/dotGridBackground';
import DotGrid from '../ui/dotgridreactive';
import FlipLink from '../NavBar/FlipLinks';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import StaggeredLink from './StaggeredLink';

const AnimatedText = ({
    text,
    el: Wrapper = 'p',
    className,
    style,
    stagger = 0.08
}) => {
    const ref = useRef(null);
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
    const columnVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.06,
                delayChildren: 0.2,
            },
        },
    };

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
                        <StaggeredLink title={link.name} href={link.href} />
                    </motion.li>
                ))}
            </motion.ul>
        </motion.div>
    );
};


const Footer = () => {
    const sections = {
        Product: [
            { name: 'Dashboard', href: '#' },
            { name: 'Contributor Profile', href: '#' },
            { name: 'Projects', href: '#' },
            { name: 'Rewards', href: '#' },
            { name: 'Contribution Requests', href: '#' },
            { name: 'My Projects', href: '#' },
            { name: 'Issues', href: '#' },
        ],
        Resources: [
            { name: 'Docs', href: '#' },
            { name: 'FAQs', href: '#' },
            { name: 'Pricing', href: '#' },
        ],
        Company: [
            { name: 'About Us', href: '#' },
            { name: 'LinkedIn', href: '#' },
            { name: 'Twitter', href: '#' },
            { name: 'Contact Us', href: '#' },
        ],
        Developers: [
            { name: 'Developer GitHubs', href: '#' },
            { name: 'Developer Twitters', href: '#' },
            { name: 'Developer LinkedIn', href: '#' },
        ],
        Content: [
            { name: 'Terms of Use', href: '#' },
            { name: 'Privacy Policy', href: '#' },
        ]
    };

    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-150px 0px" });

    const gridContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
            },
        },
    };

    return (
        <div className='md:min-h-[73vh] min-h-[60vh] bg-[#fffafa] w-full relative select-none overflow-hidden z-20'>

            <div className='w-full h-full'>
                <div className='w-[90vw] md:h-[0.15vh] h-[0.2vh] bg-[#09090b] absolute top-[0.4px] left-[4.7vw]'></div>
            </div>
            <div className="flex z-50">
                <div className='w-full px-8 pt-9 pb-24 md:w-[70vw] md:pl-32 z-50'>
                    <motion.div
                        ref={ref}
                        className="grid grid-cols-2 gap-12 sm:grid-cols-3 lg:grid-cols-5 z-50"
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
