'use client';

import { useThemeChange } from './End/ThemeChangeContext';
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';


const defaultGsapConfig = {
    stoppagePoints: [],
    pauseDuration: 600, 
    duration: 6024, 
};

const OdometerLoaderGSAP = ({
    stoppagePoints = defaultGsapConfig.stoppagePoints,
    pauseDuration = defaultGsapConfig.pauseDuration,
    duration = defaultGsapConfig.duration,
    className = "text-xl font-bold text-gray-200",
}) => {
    const [percentage, setPercentage] = useState(0);
    const timelineRef = useRef(null);

    const { isLoaded, setIsLoaded } = useThemeChange();

    useEffect(() => {
        
        const ctx = gsap.context(() => {
            const counter = { val: 0 };

            
            const singleStepDuration = duration / 100;

            timelineRef.current = gsap.timeline({
                onUpdate: () => {
                    setPercentage(Math.floor(counter.val));
                },
                onComplete: () => {
                    setIsLoaded(true);
                },
            });

            
            const sortedStops = [...stoppagePoints].sort((a, b) => a - b);
            let lastStop = 0;

            sortedStops.forEach(stop => {
                if (stop > lastStop && stop <= 100) {
                    const segmentDuration = (stop - lastStop) * singleStepDuration;
                    
                    timelineRef.current.to(counter, {
                        val: stop,
                        duration: segmentDuration,
                        ease: 'none',
                    });
                    
                    timelineRef.current.to({}, { duration: pauseDuration / 1000 });
                    lastStop = stop;
                }
            });

            
            if (lastStop < 100) {
                const finalSegmentDuration = (100 - lastStop) * singleStepDuration;
                timelineRef.current.to(counter, {
                    val: 100,
                    duration: finalSegmentDuration,
                    ease: 'none',
                });
            }
        });

        
        return () => ctx.revert();

    }, [duration, pauseDuration, stoppagePoints, setIsLoaded]);

    return (
        <div className="w-full flex items-end justify-end px-[13vw]">
            <h1 className={className}>
                Loading {percentage}%
            </h1>
        </div>
    );
};

export default OdometerLoaderGSAP;