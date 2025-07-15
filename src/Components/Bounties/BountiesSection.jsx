import React, { useEffect, useRef } from 'react'
import Image from 'next/image';
import { BentoGrid, BentoGridItem } from "./BentoGrid";
import {
    IconArrowWaveRightUp,
    IconBoxAlignRightFilled,
    IconBoxAlignTopLeft,
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
} from "@tabler/icons-react";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

const BountiesSection = () => {
    const items = [
        {
            image: 'https://picsum.photos/300/300?grayscale',
            link: 'https://google.com/',
            title: 'Bounty 1',
            description: 'This is pretty cool, right?'
        },
        {
            image: 'https://picsum.photos/400/400?grayscale',
            link: 'https://google.com/',
            title: 'Bounty 2',
            description: 'This is pretty cool, right?'
        },
        {
            image: 'https://picsum.photos/500/500?grayscale',
            link: 'https://google.com/',
            title: 'Bounty 3',
            description: 'This is pretty cool, right?'
        },
        {
            image: 'https://picsum.photos/600/600?grayscale',
            link: 'https://google.com/',
            title: 'Bounty 4',
            description: 'This is pretty cool, right?'
        }
    ];

    return (
        <div id='bounties' className='min-h-[150vh] h-full relative flex items-center py-[20vh] pb-[40vh] justify-center'>
            <div className='z-50 flex flex-col items-center w-full gap-[35vh]'>
                <div className='flex flex-col gap-3 w-full items-start px-[10vw]'>
                    <h1 className='text-[8vw] font-bold leading-0 text-shadow-white text-white'>
                        Popular
                    </h1>
                    <h1 className='text-[8vw] font-bold ml-[12vw] text-shadow-white text-white'>
                        Bounties
                    </h1>
                </div>

                <div className='h-[90vh] w-[90vw] z-50 relative'>
                    {/* <InfiniteMenu items={items} /> */}
                </div>
            </div>

            <div className='absolute top-[37vh] left-[16.2vw] rotate-90'>
                <Image src={"/arrow.png"} height={90} width={120} alt='Arrow Image' />
            </div>

            <div className='absolute top-[46vh] right-[11vw] rotate-12'>
                <h1 className='text-[4vw] text-white text-nowrap font-semibold font-[Dancing_Script]'>Drag Me</h1>
            </div>

            <div className='absolute top-[55.5vh] right-[6.5vw] rotate-280 rotate-y-180'>
                <Image src={"/arrow.png"} height={70} width={90} alt='Arrow Image' />
            </div>

            <div className='w-full h-full inset-0 absolute z-0'>
                
            </div>
        </div>
    )
}

export default BountiesSection
