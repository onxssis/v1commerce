import React from 'react';
import { useRouter } from 'next/router';

import Products from '../Products/Products';
import LandingImage from '../../assets/img/products-bg.jpg';
import Button from '@/components/Button/Button';
import useSession from '@/hooks/useSession';

function HomePage() {
  const router = useRouter();

  const { session } = useSession();

  const isAdmin = session ? session.user?.admin : false;

  return (
    <>
      <div
        className="relative pt-16 pb-32 flex content-center items-center justify-center"
        style={{
          minHeight: '75vh',
        }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${LandingImage})`,
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-5xl">Products.</h1>
                <p className="mt-4 text-lg text-gray-300">
                  Free global delivery for all products. Use coupon 25summer for
                  an extra 25% Off
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: '70px', transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 xl:px-0">
        <div className="flex justify-between items-center">
          <h4 className="text-3xl font-normal leading-normal mt-4 mb-6 text-grey-800">
            Latest Offers
          </h4>

          {isAdmin && (
            <Button onClick={() => router.push('/admin/new-product')}>
              Add Product
            </Button>
          )}
        </div>

        <Products isAdmin={isAdmin} />
      </div>
    </>
  );
}

export default HomePage;
