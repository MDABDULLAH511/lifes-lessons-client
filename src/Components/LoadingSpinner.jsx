import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <style>{`
        .loader3 {
          display: flex;
          justify-content: center;
          align-items: center;
        }


        .bars {
          width: 10px;
          height: 20px;
          margin: 0 2px;
          border-radius: 4px;
          animation: loader3 3s ease-in-out infinite;
        }


        .bar1 { background-color: #4285F4; animation-delay: -0.8s; }
        .bar2 { background-color: #4285F4; animation-delay: -0.7s; }
        .bar3 { background-color: #4285F4; animation-delay: -0.6s; }
        .bar4 { background-color: #4285F4; animation-delay: -0.5s; }
        .bar5 { background-color: #4285F4; animation-delay: -0.4s; }
        .bar6 { background-color: #4285F4; animation-delay: -0.3s; }
        .bar7 { background-color: #4285F4; animation-delay: -0.2s; }
        .bar8 { background-color: #4285F4; animation-delay: -0.1s; }
        .bar9 { background-color: #4285F4; animation-delay: 0s; }
        .bar10 { background-color: #4285F4; animation-delay: 0.1s; }


        @keyframes loader3 {
          0% { transform: scale(1); }
          20% { transform: scale(1, 2.32); }
          40% { transform: scale(1); }
        }
      `}</style>

      <div className="loader3">
        <div className="bars bar1"></div>
        <div className="bars bar2"></div>
        <div className="bars bar3"></div>
        <div className="bars bar4"></div>
        <div className="bars bar5"></div>
        <div className="bars bar6"></div>
        <div className="bars bar7"></div>
        <div className="bars bar8"></div>
        <div className="bars bar9"></div>
        <div className="bars bar10"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
