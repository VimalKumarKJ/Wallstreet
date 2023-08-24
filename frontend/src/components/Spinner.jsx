// import React from 'react';
// import {FallingLines} from 'react-loader-spinner';

// const Spinner = ({ message }) => {
//   return (
//     <div className="flex flex-col justify-center items-center w-full h-full">
//       <FallingLines
//         color="#00BFFF"
//         height={50}
//         width={200}
//         className="m-5"
//       />
//       <p className="text-lg text-center px-2">{message}</p>
//     </div>
//   );
// };

// export default Spinner;

import React from 'react'
import logo from '../assets/favicon.png'

const Spinner = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <img
        src={logo}
        alt="Logo Spinner"
        className="animate-spin h-150 w-150 m-5"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
};

export default Spinner;




