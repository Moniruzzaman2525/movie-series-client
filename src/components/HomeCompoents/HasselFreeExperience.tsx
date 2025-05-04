import Image from "next/image";
import React from "react";

const HasselFreeExperience = () => {
  return (
    <div className="container mx-auto  my-20 px-2 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="">
          <Image
            src="https://i.ibb.co.com/TBs0HL9B/sl-121019-25870-81.jpg"
            alt="img"
            height={1000}
            width={1000}
            className="w-full rounded"
          />
        </div>
        <div className="flex flex-col justify-start items-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            Best pick for{" "}
            <span className="text-red-600 uppercase">hassle-free</span>{" "}
            streaming experience.
          </h1>
          <div className="my-5 flex justify-center items-center gap-4">
            <Image
              src="https://i.ibb.co.com/5W5Xn7Kg/icon01.png"
              alt="img"
              height={100}
              width={100}
            ></Image>
            <div>
              <h1 className="text-2xl font-bold">Access while traveling</h1>
              <p>
                Keep access to your entertainment content while roaming the
                world.Pick from thousands.
              </p>
            </div>
          </div>
          <div className="my-5 flex justify-center items-center gap-4">
            <Image
              src="https://i.ibb.co.com/Y72SBCpG/icon02.png"
              alt="img"
              height={100}
              width={100}
            ></Image>
            <div>
              <h1 className="text-2xl font-bold">
                Stream with no interruptions
              </h1>
              <p>
                Pause for snacks, not buffering. Stream smoothly with our
                lightning-fast NordLynx protocol network.
              </p>
            </div>
          </div>
          <div className="my-5 flex justify-center items-center gap-8">
            <Image
              src="https://i.ibb.co.com/KzryPnMq/icon03.png"
              alt="img"
              height={100}
              width={100}
            ></Image>
            <div>
              <h1 className="text-2xl font-bold">Stay secure at all times</h1>
              <p>
                Securely access and enjoy your favorite content, even on public
                Wi-Fi. Your connection
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HasselFreeExperience;
