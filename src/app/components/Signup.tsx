

export const Signup = () => {
  return (
    <div className="w-[1316] border-color: var(--color-black)  p-8 bg-white` shadow-lg rounded-lg mx-auto mt-20">
      <h2 className="text-2xl font-bold text-center mb-6 ">Join Lightning!</h2>

      <div className="space-y-4">
        
      </div>

      <div className="flex items-center my-6">
        <hr className="flex-grow border-gray-300" />
        <span className="px-2 text-gray-500">or</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Name@example.com"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-md"
        />
      </div>

      <button className="w-full bg-blue-600 text-white py-3 mt-6 rounded-md">
        Sign Up
      </button>

      <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <a href="#" className="text-blue-600">
          Login
        </a>
      </p>
    </div>
  );
};
