

const LoadingSpinner = () => {
     return (
          <div className="flex items-center justify-center min-h-screen bg-black">
               <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600 border-opacity-50"></div>
          </div>
     );
};

export default LoadingSpinner;
