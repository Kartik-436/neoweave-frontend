"use Client";
import React from 'react'
import DotGridBackground from '../ui/dotGridBackground';
import DotGrid from '../ui/dotgridreactive';

const EndPage = () => {
    return (
        <div className='bg-[#09090b] w-full min-h-[120vh] overflow-hidden relative flex items-end justify-center'>
            <div className='max-w-[30vw] z-20 text-white text-6xl py-20'>
                Built Different
            </div>

            <div className='w-full h-full inset-0 absolute z-0'>
                <DotGridBackground
                    dotSize={0.8}
                    dotColor="#ffffff65"
                    dotIntensity={4}
                />
            </div>
        </div>
    )
}

export default EndPage
