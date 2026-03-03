// import React from 'react'
import AboutTeams from '../components/AboutTeams'
import AboutUs from '../components/AboutUs'
import Appointment from '../components/Appointment'
import Banner from '../components/Banner'
import DentalServices from '../components/DentalServices'
import Plans from '../components/Plans'
import Reviews from '../components/Reviews'
import ServicesBooking from '../components/ServicesBooking'

const Home = () => {
  return (
    <>
        <Banner />
        <DentalServices />
        <AboutUs />
        <Appointment />
        <AboutTeams />
        <Reviews/>
        <Plans />
        <ServicesBooking />
    </>
  )
}

export default Home