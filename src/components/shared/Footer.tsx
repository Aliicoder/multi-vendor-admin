import { FaUpRightFromSquare } from "react-icons/fa6"
import LinkButton from "../buttons/LinkButton"

function Footer() {
  return (
  <div className='relative before:content-["*"] before:w-lvw before:border-t before:h-full before:left-0  before:absolute before:bg-white before:z-0'>
      <div className='relative container mx-auto flex flex-col montserrat px-[100px] bg-white border-t shadow-sm b'>
        <div className="z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className=" flex flex-col gap-3 p-20">
            <h1 className='c4 hidden md:block font-semibold'>
              souq
            </h1>
            <p className="text-sm">
              Makin Photography is a distinguished company celebrated for its 
              unparalleled creativity and precision. 
              Their team of expert photographers excels at weaving 
              artistry and emotion into every frame, 
              ensuring that each image is both vivid and evocative. 
            </p>
            <h2 className="c4 font-semibold">Email</h2>
            <p>souq@gmail.com</p>
          </div>
          
          <div className="p-20">
              <h2 className="c4 font-semibold">EXPLORE</h2>
              <ul className="flex flex-col gap-5 my-5">
                <li>About us</li>
                <li>About our shop</li>
                <li>Privacy and policy</li>
                <li>Blogs</li>
              </ul>
          </div>
          <div className="flex flex-col gap-3 p-20">
            <div className="flex flex-col gap-2">
              <h2 className="c4 font-semibold">Become a Seller</h2>
              <p>join our community</p>
              <div className="flex">
                <LinkButton className="cp-x-2_7 c3 text-nowrap cp-y-1_4 m-4 gap-2  font-semibold bg-transparent border  ring-offset-4 ring-1 hover:ring-0 transition-all" to={""} text="Sign up" direction={"right"}>
                  <FaUpRightFromSquare  className="c2"/>
                </LinkButton>
              </div>
            </div>
            <h2 className="c4 font-semibold ">Contact us</h2>
            <p>+91 6366313872</p>
            <p>+91 7166313872</p>
          </div>
        </div>
        <div className="z-10 flex justify-center items-center">
          <h1 className="c3 p-5 border-t">Copyrights 2024 All rights reserved </h1>
        </div>
      </div>
  </div>
  )
}

export default Footer