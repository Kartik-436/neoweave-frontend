import React, { useEffect, useRef } from 'react'
import InfiniteMenu from './InfiniteMenu';
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
import { FlickeringGrid } from '../ui/flickering-grid';
import DotGridBackground from '../ui/dotGridBackground';
import DotGrid from '../ui/dotgridreactive';
import StaggeredTextButton from './../StaggeredButton';


// const BountiesSection = () => {
//     const items = [
//         {
//             image: 'https://picsum.photos/300/300?grayscale',
//             link: 'https://google.com/',
//             title: 'Bounty 1',
//             description: 'This is pretty cool, right?'
//         },
//         {
//             image: 'https://picsum.photos/400/400?grayscale',
//             link: 'https://google.com/',
//             title: 'Bounty 2',
//             description: 'This is pretty cool, right?'
//         },
//         {
//             image: 'https://picsum.photos/500/500?grayscale',
//             link: 'https://google.com/',
//             title: 'Bounty 3',
//             description: 'This is pretty cool, right?'
//         },
//         {
//             image: 'https://picsum.photos/600/600?grayscale',
//             link: 'https://google.com/',
//             title: 'Bounty 4',
//             description: 'This is pretty cool, right?'
//         }
//     ];

//     return (
//         <div id='bounties' className='min-h-[150vh] h-full relative flex items-center py-[20vh] pb-[40vh] justify-center'>
//             <div className='z-50 flex flex-col items-center w-full gap-[35vh]'>
//                 <div className='flex flex-col gap-3 w-full items-start px-[10vw]'>
//                     <h1 className='text-[8vw] font-bold leading-0 text-shadow-white text-white'>
//                         Popular
//                     </h1>
//                     <h1 className='text-[8vw] font-bold ml-[12vw] text-shadow-white text-white'>
//                         Bounties
//                     </h1>
//                 </div>

//                 <div className='h-[90vh] w-[90vw] z-50 relative'>
//                     <InfiniteMenu items={items} />
//                 </div>
//             </div>

//             <div className='absolute top-[37vh] left-[16.2vw] rotate-90'>
//                 <Image src={"/arrow.png"} height={90} width={120} alt='Arrow Image' />
//             </div>

//             <div className='absolute top-[46vh] right-[11vw] rotate-12'>
//                 <h1 className='text-[4vw] text-white text-nowrap font-semibold font-[Dancing_Script]'>Drag Me</h1>
//             </div>

//             <div className='absolute top-[55.5vh] right-[6.5vw] rotate-280 rotate-y-180'>
//                 <Image src={"/arrow.png"} height={70} width={90} alt='Arrow Image' />
//             </div>

//             <div className='w-full h-full inset-0 absolute z-0'>
//                 <DotGrid
//                     dotSize={2.5}
//                     gap={26}
//                     baseColor="#ffffff65"
//                     activeColor="#9D00FF"
//                     proximity={150}
//                     shockRadius={300}
//                     shockStrength={7}
//                     resistance={800}
//                     returnDuration={1.5}
//                 />
//             </div>
//         </div>
//     )
// }

// export default BountiesSection

gsap.registerPlugin(ScrollTrigger);

function BentoGridDemo() {
    const Headref = useRef(null)
    const imgref = useRef(null)
    const btnref = useRef(null)

    useEffect(() => {

    }, [])

    return (
        <div id='bounties' className='dark min-h-[150vh] h-full relative flex flex-col gap-[10vh] items-center py-[20vh] justify-center'>
            <div ref={Headref} className='flex flex-col gap-3 w-full items-start px-[10vw]'>
                <h1 className='text-[8vw] font-bold leading-0 text-shadow-white text-white'>
                    Popular
                </h1>
                <h1 className='text-[8vw] font-bold ml-[12vw] text-shadow-white text-white'>
                    Bounties
                </h1>
            </div>

            <div ref={imgref} className='absolute top-[37vh] left-[16.2vw] rotate-90'>
                <Image src={"/arrow.png"} height={90} width={120} alt='Arrow Image' />
            </div>

            <div className='w-full h-full z-10 flex flex-col gap-[10vh] items-end justify-end'>
                <BentoGrid className="max-w-[80vw] mx-auto">
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            className={i === 3 || i === 6 ? "md:col-span-2" : ""} />
                    ))}
                </BentoGrid>

                <div ref={btnref} className='w-full pr-[12vw] flex items-end justify-end'>
                    <StaggeredTextButton
                        text="View More"
                        hoverText="View More"
                        className='hover:text-white text-[1.4vw] hover:shadow-[0_0_30px_5px] hover:shadow-[#a200ff] rounded-full px-13 py-7 hover:bg-[#a200ff] bg-[#f5f5f5] text-black cursor-pointer transition-all duration-500'
                    />
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
    );
}

export default BentoGridDemo;

const Skeleton = () => (
    <div
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
    {
        title: "Bounty",
        description: "Explore the birth of groundbreaking ideas and inventions.",
        header: <Skeleton />,
        icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Bounty",
        description: "Dive into the transformative power of technology.",
        header: <Skeleton />,
        icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Bounty",
        description: "Discover the beauty of thoughtful and functional design.",
        header: <Skeleton />,
        icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Bounty",
        description:
            "Understand the impact of effective communication in our lives.",
        header: <Skeleton />,
        icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Bounty",
        description: "Join the quest for understanding and enlightenment.",
        header: <Skeleton />,
        icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Bounty",
        description: "Experience the thrill of bringing ideas to life.",
        header: <Skeleton />,
        icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
    },
    {
        title: "Bounty",
        description: "Embark on exciting journeys and thrilling discoveries.",
        header: <Skeleton />,
        icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
    },
];
