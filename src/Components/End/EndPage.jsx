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
                <DotGrid
                    dotSize={2}
                    gap={20}
                    baseColor="#ffffff65"
                    activeColor="#9D00FF"
                    proximity={170}
                />
            </div>
        </div>
    )
}

export default EndPage
