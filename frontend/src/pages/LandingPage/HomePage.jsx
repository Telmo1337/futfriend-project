import Navbar from "./Navbar"
import Hero from "./Hero"
import HowItWorks from "./HowItWorks"
import { Divider } from "@mui/material"
import Footer from "./Footer"
import WhyChoose from "./WhyChoose"
import Cta from "./cta"

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Divider />
      <HowItWorks />
      <Divider />
      <WhyChoose />
      <Divider />
      <Cta />
      <Footer />
    </>
  )
}

export default HomePage
