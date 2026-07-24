import "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Premium Circle */}
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="#FFF8E7"
          stroke="#F59E0B"
          strokeWidth="2.5"
        />

        {/* Spoon */}
        <ellipse cx="24" cy="16" rx="5" ry="7" fill="#F59E0B" />

        <rect x="22.8" y="22" width="2.4" height="12" rx="1.2" fill="#F59E0B" />

        {/* Leaf */}
        <path d="M28 18C35 12 40 17 36 24C33 29 27 27 28 18Z" fill="#22C55E" />

        <path d="M29 19L35 23" stroke="#166534" strokeWidth="1" />
      </svg>

      <div className="leading-none">
        <h1 className="text-2xl font-extrabold tracking-tight font-['Outfit'] ">
          <span className="text-amber-500 ">Food</span>
          <span className="text-orange-600">Nest</span>
        </h1>




        {/* <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
          Fresh • Healthy • Delicious
        </p> */}
      </div>
    </div>
  );
};

export default Logo;
