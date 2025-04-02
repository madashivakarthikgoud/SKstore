import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up'); // Track if it's Login or Sign Up page

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // Handle form submission (you can call API here for actual login or sign-up logic)
    
    // Show success toast
    toast.success(`${currentState} successfully!`);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-[400px] m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="font-medium text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Conditional rendering of the "Name" field for Sign Up only */}
      {currentState === 'Login' ? null : (
        <div className="relative w-full">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-800 rounded-md"
            placeholder="Name"
            required
          />
          <span className="absolute text-sm text-red-500 top-[50%] right-3 transform -translate-y-1/2">
            Required
          </span>
        </div>
      )}

      {/* Common Email and Password fields */}
      <div className="relative w-full">
        <input
          type="email"
          className="w-full px-3 py-2 border border-gray-800 rounded-md"
          placeholder="Email"
          required
        />
        <span className="absolute text-sm text-red-500 top-[50%] right-3 transform -translate-y-1/2">
          Required
        </span>
      </div>

      <div className="relative w-full">
        <input
          type="password"
          className="w-full px-3 py-2 border border-gray-800 rounded-md"
          placeholder="Password"
          required
        />
        <span className="absolute text-sm text-red-500 top-[50%] right-3 transform -translate-y-1/2">
          Required
        </span>
      </div>

      {/* "Forgot Password" and Sign Up/Login toggle */}
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === 'Login' ? (
          <p
            onClick={() => setCurrentState('Sign Up')}
            className="cursor-pointer text-blue-500"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState('Login')}
            className="cursor-pointer text-blue-500"
          >
            Login here
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4 rounded-md"
      >
        {currentState === 'Login' ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
};



// import React, { useState } from 'react';

// export const Login = () => {
//   const [currentState, setCurrentState] = useState('Sign Up'); // Track if it's Login or Sign Up page

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//     // Handle form submission (you can call API here for actual login or sign-up logic)
//     console.log(`${currentState} form submitted`);
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-[400px] m-auto mt-14 gap-4 text-gray-800">
//       <div className="inline-flex items-center gap-2 mb-2 mt-10">
//         <p className="font-medium text-3xl">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       {/* Conditional rendering of the "Name" field for Sign Up only */}
//       {currentState === 'Login' ? null : (
//         <input
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="Name"
//           required
//         />
//       )}

//       {/* Common Email and Password fields */}
//       <input
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Email"
//         required
//       />
//       <input
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//       />

//       {/* "Forgot Password" and Sign Up/Login toggle */}
//       <div className="w-full flex justify-between text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         {currentState === 'Login' ? (
//           <p
//             onClick={() => setCurrentState('Sign Up')}
//             className="cursor-pointer text-blue-500"
//           >
//             Create account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState('Login')}
//             className="cursor-pointer text-blue-500"
//           >
//             Login here
//           </p>
//         )}
//       </div>

//       {/* Submit Button */}
//       <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4">
//         {currentState === 'Login' ? 'Login' : 'Sign Up'}
//       </button>
//     </form>
//   );
// };
