import React from 'react'
import { PricingTabs } from './PricingTabs'
import DotGridBackground from '../ui/dotGridBackground'

const PricingPage = () => {
    return (
        <div className="bg-[#09090b] dark w-full min-h-[130vh] md:min-h-screen py-[5vh] md:py-[20vh] relative no-visible-scrollbar">
            <div>
                <PricingTabs />
                <div className='w-full h-full inset-0 absolute z-0'>
                    <DotGridBackground dotColor="#ffffff65" hoverColor="#9D00FF" dotSize={0.8} dotIntensity={4.5} />
                </div>
            </div>
        </div>
    )
}

export default PricingPage
