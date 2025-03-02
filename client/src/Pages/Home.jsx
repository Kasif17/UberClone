import React from 'react';
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className="h-screen w-full flex flex-col bg-blue-600 relative">
      {/* Uber Logo at Top Center */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <img 
          className="w-32" 
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
          alt="Uber Logo" 
        />
      </div>

      {/* Main Content: Safety Image & Text */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <img 
          className="w-48 md:w-64 mb-4 mt-6" 
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" 
          alt="Uber Safety" 
        />
        <h1 className="text-black text-2xl font-bold mt-6">Move with safety</h1>
      </div>

      {/* "Get Started" Button at Bottom Center with Increased Width */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-4/5 md:w-2/3">
      <Link 
  to='/login' 
  className="block w-full bg-gray-300 text-black py-3 rounded-lg text-lg font-bold flex justify-center items-center hover:bg-gray-400 transition duration-300 cursor-pointer"
>
  Get started →
</Link>
      </div>
    </div>
  );
}

export default Home;





// import React from 'react'

// const Home = () => {
//   return (
//     <div>
//       <div className='bg-cover bg-center bg-[url(https://e7.pngegg.com/pngimages/893/188/png-clipart-street-lights-street-lights-traffic-light.png)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
//       <img className="w-16 ml-50%" 
//       src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
//       alt="Uber Logo" />
//         <div className='bg-white pb-7 py-4 px-4'>
//             <h1 className='text-3xl font-bold'>Get Started with Uber</h1>
//             <button className='w-full bg-black text-white py-3 rounded mt-4 '>Get started</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home
