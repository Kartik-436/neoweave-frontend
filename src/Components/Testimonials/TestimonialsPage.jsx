import React, { useEffect, useRef } from 'react'
import { InfiniteMovingCards } from './InfiniteCarousal';
import gsap from 'gsap';

function InfiniteMovingCardsDemo() {
    return (
        <div className="min-h-[28rem] rounded-md flex flex-col antialiased bg-white dark:bg-[#09090b] dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
                pauseOnHover={true}
            />

            <InfiniteMovingCards
                items={testimonials}
                direction="left"
                speed="slow"
                pauseOnHover={true}
            />
        </div>
    );
}

const TestimonialsPage = () => {
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
        <div id='customers' className='bg-[#09090b] dark w-full min-h-[120vh] block py-20 relative'>
            <div className='flex flex-col mt-18 md:mt-[20vh] gap-12 md:gap-16 z-50 md:z-10'>
                <div className='text-white w-full text-center flex flex-col items-center gap-3 z-10 pointer-events-none'>
                    <h1 className='text-white text-3xl md:text-7xl font-bold max-w-[80vw] md:max-w-[75vw] text-center'>
                        Loved by business and developers across the planet
                    </h1>
                    <p className='text-neutral-400 text-sm md:text-md font-semibold'>
                        Here's what people are saying about Neoweave
                    </p>
                </div>
                <InfiniteMovingCardsDemo />
            </div>

            {/* Floating Balls */}


            <div className='w-full h-full inset-0 absolute z-0'>

            </div>
        </div>
    );
}

export default TestimonialsPage

const testimonials = [
    {
        quote:
            "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
        name: "Charles Dickens",
        title: "A Tale of Two Cities",
    },
    {
        quote:
            "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
        name: "William Shakespeare",
        title: "Hamlet",
    },
    {
        quote: "All that we see or seem is but a dream within a dream.",
        name: "Edgar Allan Poe",
        title: "A Dream Within a Dream",
    },
    {
        quote:
            "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
        name: "Jane Austen",
        title: "Pride and Prejudice",
    },
    {
        quote:
            "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
        name: "Herman Melville",
        title: "Moby-Dick",
    },
];