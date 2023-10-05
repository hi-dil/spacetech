import Image from "next/image";
import maintenanceImg from "../assets/Maintenance.svg";

export default function Maintenance() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-between">
      <div className="xl:w-1/2 flex-1 flex flex-col items-center justify-center text-center px-4 lg:px-0">
        <Image src={maintenanceImg} alt="test" width={500} height={500} />
        <p className="text-4xl font-bold text-gray-700 capitalize tracking-wide mt-8">
          Website under maintenance!
        </p>
        <p className="text-xl text-gray-700 uppercase mt-4">
          We&apos;ll be back soon
        </p>
      </div>
    </div>
  );
}
