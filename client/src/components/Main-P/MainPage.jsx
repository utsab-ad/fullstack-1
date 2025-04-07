import React from 'react'
import Navbar from '../Navbar-A/Navbar'
import Footer from '../Footer-L/Footer'
import Content from '../Content-a/Content'
import './Main.css'
import About_project from '../About_Project/About_project'

const MainPage = () => {
  return (
    <div className="main-div">
      <Navbar/>

{/* content of the page is here */}
<Content/>
<About_project/>


<Footer/>
    </div>
  )
}

export default MainPage
