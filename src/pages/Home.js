import React from 'react'
import Hero from '../components/Hero'
import Banner from '../components/Banner'
import FeaturedRooms from '../components/FeaturedRooms'
import {Link} from 'react-router-dom'
import Services from '../components/Services'
import Button from '../components/StyledHero'



export default function Home() {
    return (
        <>
        <Hero>
            <Banner title="Luxury rooms" subtitle="deluxe rooms starting at £299"><Link to="/rooms" className="btn-primary">Our rooms</Link></Banner>
        </Hero>
        <Services />
        <FeaturedRooms/>
        </>
    )
}
