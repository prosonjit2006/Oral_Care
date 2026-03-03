// import React from 'react'
import AboutTeams from '../components/AboutTeams'
import AboutUs from '../components/AboutUs'
import Appointment from '../components/Appointment'
import Banner from '../components/Banner'
import DentalServices from '../components/DentalServices'

const Home = () => {
  return (
    <>
        <Banner />
        <DentalServices />
        <AboutUs />
        <Appointment />
        <AboutTeams />
    </>
  )
}

export default Home