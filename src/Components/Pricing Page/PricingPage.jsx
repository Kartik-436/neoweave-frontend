import React from 'react'
import { PricingTabs } from './PricingTabs'

const PricingPage = () => {
    return (
        <div className="bg-[#09090b] dark w-full min-h-[130vh] md:min-h-screen py-[5vh] md:py-[20vh] relative no-visible-scrollbar">
            <div>
                <PricingTabs />
                {/* <div className='absolute top-0 left-0 h-full'>
                    <Bg />
                </div> */}
            </div>
        </div>
    )
}

export default PricingPage
