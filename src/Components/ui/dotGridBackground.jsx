import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const DotGridBackground = ({
    dotColor = '#ffffff50',
    hoverColor = '#9D00FF',
    dotSize = 1.4,
    dotIntensity = 4
}) => {
    const canvasRef = useRef(null);
    const [hoverPosition, setHoverPosition] = useState(null);
    const dotsRef = useRef([]);

    // Initialize dots on mount and resize
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const resizeObserver = new ResizeObserver(() => {
            initDots();
            drawDots();
        });

        resizeObserver.observe(canvas.parentElement);
        window.addEventListener('resize', initDots);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener('resize', initDots);
        };
    }, [dotIntensity]);

    // Initialize dot positions
    const initDots = () => {
        const canvas = canvasRef.current;
        const { width, height } = canvas.parentElement.getBoundingClientRect();

        canvas.width = width;
        canvas.height = height;

        const spacing = 100 / dotIntensity;
        const dots = [];

        for (let x = 0; x < width; x += spacing) {
            for (let y = 0; y < height; y += spacing) {
                dots.push({ x, y, original: true });
            }
        }

        dotsRef.current = dots;
    };

    // Draw all dots with hover effect
    const drawDots = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        dotsRef.current.forEach(dot => {
            const isHovered = hoverPosition &&
                Math.sqrt((dot.x - hoverPosition.x) ** 2 + (dot.y - hoverPosition.y) ** 2) < 160;

            ctx.beginPath();
            ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
            ctx.fillStyle = isHovered ? hoverColor : dotColor;
            ctx.fill();
        });
    };

    // Handle mouse movement
    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        setHoverPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        requestAnimationFrame(drawDots);
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
        setHoverPosition(null);
        requestAnimationFrame(drawDots);
    };

    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <canvas
                ref={canvasRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
};

DotGridBackground.propTypes = {
    dotColor: PropTypes.string,
    hoverColor: PropTypes.string,
    dotSize: PropTypes.number,
    dotIntensity: PropTypes.number
};

export default DotGridBackground;