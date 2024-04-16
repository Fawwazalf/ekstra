"use client";
import { useRouter } from "next/navigation";

const Back = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.back()}
      className="flex items-center gap-[10px] mt-[25px] ml-[50px] mb-[48px] hover:cursor-pointer  "
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_169_662)">
          <path
            d="M3.9183 10.1973L9.21554 15.972C9.64364 16.4766 9.5816 17.2327 9.07697 17.6608C8.57234 18.0889 7.8162 18.0269 7.3881 17.5223L0.343771 9.8431C0.242477 9.74132 0.160394 9.62209 0.101474 9.49115C0.0282049 9.32837 -0.00769442 9.15126 -0.00359007 8.9728L-0.00357249 8.97169C0.000506253 8.79363 0.0441273 8.6187 0.124133 8.45957C0.131912 8.44417 0.140024 8.42893 0.148461 8.41387C0.197283 8.32652 0.256947 8.24568 0.326035 8.17328L7.55766 0.371123C8.00752 -0.114226 8.76564 -0.142984 9.25098 0.306858C9.73631 0.7567 9.76508 1.51484 9.31524 2.00018L3.93871 7.80089H16.7788C17.4406 7.80089 17.9771 8.33735 17.9771 8.99912C17.9771 9.66088 17.4406 10.1973 16.7788 10.1973H3.9183V10.1973Z"
            fill="#252B42"
          />
        </g>
        <defs>
          <clipPath id="clip0_169_662">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>

      <p className="font-bold text-[14px] ">Kembali</p>
    </div>
  );
};

export default Back;
