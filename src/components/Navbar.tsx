import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <section className="container mx-auto flex justify-between align-middle items-center mt-5 bg-transparent fixed top-0 left-0 right-0 w-full z-50">
      {/* logo part */}
      <div className="logo">
        <a href="#">
          <img src={logo} alt="logo" />
        </a>
      </div>

      {/* navlist part */}
      <ul className="navlist flex gap-5">
        {["Home", "Services", "Team", "Subscription", "Contact Us"].map(
          (item, idx) => (
            <li key={idx}>
              <a href="#" className=' hover:scale-600 hover:to-blue-400 text-white' >{item}</a>
            </li>
          ),
        )}

        {/* <ul className="navitems flex gap-5">
                <li><a href="#" className=' hover:scale-600 hover:to-blue-400 text-white'> Home </a></li>
                <li><a href="#" className=' hover:scale-600 hover:to-blue-400 text-white'> Services </a></li>
                <li><a href="#" className=' hover:scale-600 hover:to-blue-400 text-white'> Team </a></li>
                <li><a href="#" className=' hover:scale-600 hover:to-blue-400 text-white'> Subscriptions </a></li>
                <li><a href="#" className=' hover:scale-600 hover:to-blue-400 text-white'> Contact Us </a></li>
            </ul> */}
      </ul>
      <div className="navBtn">
        <a href="#" className=" border border-white text-white p-2 rounded">
          {" "}
          Get Appointment{" "}
        </a>
      </div>
    </section>
  );
};

export default Navbar;

// {["Home","About Us","Shop","Blog","Contact"].map((item,index)=>(
//                     <li key={index}><a href="#">{item}</a></li>
//                 ))}
