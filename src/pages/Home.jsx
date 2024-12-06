import React from 'react'
import {Hero} from '../components/Hero'
import { LatestCollection } from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewLetterBox from '../components/NewLetterBox'

export const Home = () => {
  return (
    <div>
    <Hero/>
    <LatestCollection/>
    <BestSeller/>
    <OurPolicy/>
    <NewLetterBox/>
    </div>
  )
}