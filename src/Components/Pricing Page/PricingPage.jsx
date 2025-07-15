import React from 'react'
import { PricingTabs } from './PricingTabs'
import DotGridBackground from '../ui/dotGridBackground'
import DotGrid from '../ui/dotgridreactive'

const PricingPage = () => {
    return (
        <div className="bg-[#09090b] dark w-full min-h-[130vh] md:min-h-screen py-[5vh] md:py-[20vh] relative no-visible-scrollbar">
            <div>
                <PricingTabs />
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
        </div>
    )
}

export default PricingPage
