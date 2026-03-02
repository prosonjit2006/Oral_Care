

const Navbar = () => {
  return (
    <div className=" flex justify-between align-middle p-2">

        {/* logo part */}
      <div className="logo">
        <a href="#">
            <img src="./" alt="logo" />
        </a>
      </div>
      
      {/* navlist part */}
        <div className="navlist">
            <ul className="navitems flex gap-3">
                <li><a href="#"> Home </a></li>
                <li><a href="#"> Services </a></li>
                <li><a href="#"> Team </a></li>
                <li><a href="#"> Subscriptions </a></li>
                <li><a href="#"> Contact Us </a></li>
            </ul>
        </div>
        <div className="navBtn">
            <a href="#" className=" border border-black"> Get Appointment </a>
        </div>

    </div>
  )
}

export default Navbar
