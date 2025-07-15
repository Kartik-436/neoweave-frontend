"use Client";
import React, { useEffect, useRef } from 'react'
import clsx from 'clsx';
import gsap from 'gsap';
import Image from 'next/image';

const PurpleSphere = ({   // Default left position
    
}) => {
    // Combine dynamic positioning/sizing with any custom styles

    return (
        // Apply the dynamic style object to the SVG element
        <div className='z-40'>
            <Image src="brownsphere.svg" width={80} height={80} alt={`sphere`}/>
        </div>
    );
};

const InfiniteScroller = () => {
    const scrollerRef = useRef(null);
    const tweenRef = useRef(null);

    useEffect(() => {
        const scroller = scrollerRef.current;

        const clone = scroller.innerHTML;
        scroller.innerHTML += clone; // Duplicate content for seamless scroll

        const totalWidth = scroller.scrollWidth / 2;

        tweenRef.current = gsap.to(scroller, {
            x: `-${totalWidth}px`,
            ease: 'none',
            duration: 90,
            repeat: -1,
        });

        return () => {
            tweenRef.current?.kill();
        };
    }, []);

    const handleMouseEnter = () => {
        tweenRef.current?.pause();
    };

    const handleMouseLeave = () => {
        tweenRef.current?.resume();
    };

    return (
        <div className='absolute z-20 top-[126vh] left-0 w-full overflow-hidden'>
            <ul
                ref={scrollerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className='flex gap-20 w-max text-nowrap text-[#09090b] will-change-transform'
            >
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <li
                            key={i}
                            className='md:text-[6vw] text-[15vw] font-semibold flex items-end justify-center gap-5'
                        >
                            <p>Neoweave is Built Different</p>
                            <PurpleSphere  />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

const ThemeChange = () => {
    const ballRefs = useRef([]);

    useEffect(() => {
        ballRefs.current.forEach((ball) => {
            floatBall(ball);
        });
    }, []);

    const floatBall = (ball) => {
        const duration = gsap.utils.random(1, 3, 0.1);
        const deltaX = gsap.utils.random(-40, 40);
        const deltaY = gsap.utils.random(-40, 40);

        gsap.to(ball, {
            x: deltaX,
            y: deltaY,
            duration: duration,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
        });
    };

    return (
        <div className='bg-[#fffafa] w-full min-h-[169vh] overflow-x-hidden z-10 overflow-y-visible relative'>

            <div ref={(el) => (ballRefs.current[0] = el)}
                className={'h-30 w-30 bg-white shadow-xl absolute z-50 rounded-full flex items-center justify-center top-[140vh] left-[80%]'}
            >
                <div className="bg-[#33333346] h-[128px] w-[128px] rounded-full blur-lg"></div>
                <div className="bg-[#ffffffc5] h-10 w-10 rounded-full blur-md absolute"></div>
            </div>

            <div ref={(el) => (ballRefs.current[1] = el)}
                className={'h-40 w-40 bg-white shadow-xl absolute z-50 rounded-full flex items-center justify-center top-[51vh] left-[43%]'}
            >
                <div className="bg-[#33333346] h-[128px] w-[128px] rounded-full blur-lg"></div>
                <div className="bg-[#ffffffc5] h-10 w-10 rounded-full blur-md absolute"></div>
            </div>

            <div ref={(el) => (ballRefs.current[2] = el)}
                className={'h-30 w-30 bg-white shadow-xl absolute z-50 rounded-full flex items-center justify-center top-[142vh] left-[11%]'}
            >
                <div className="bg-[#33333346] h-[128px] w-[128px] rounded-full blur-lg"></div>
                <div className="bg-[#ffffffc5] h-10 w-10 rounded-full blur-md absolute"></div>
            </div>

            <div ref={(el) => (ballRefs.current[3] = el)}
                className={'h-35 w-35 bg-white shadow-xl absolute z-50 rounded-full flex items-center justify-center top-[110vh] left-[47%]'}
            >
                <div className="bg-[#33333346] h-[128px] w-[128px] rounded-full blur-lg"></div>
                <div className="bg-[#ffffffc5] h-10 w-10 rounded-full blur-md absolute"></div>
            </div>

            <InfiniteScroller />

            <div className='w-full h-full inset-0 absolute z-0'>
                
            </div>
        </div>
    )
}

export default ThemeChange
