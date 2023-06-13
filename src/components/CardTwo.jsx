import { useState, useEffect } from 'react';
import adminInstance from '../instance/instance';
import { toast } from 'react-hot-toast';

const CardTwo = () => {
  const [driver, setDriver] = useState([]);
  useEffect(() => {
    adminInstance
      .get('/getActiveDrivers')
      .then((response) => {
        setDriver(response.data.drivers);
      })
      .catch((error) => {
        const { response, message } = error;
        const errorMessage = response ? response.data.message : message;
        toast.error(errorMessage);
      });
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {' '}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 9.5C15 9.0625 19.5159 6 24 6C28.484 6 33 9.0625 33 9.5C33 11.06 32.8343 11.9838 32.6937 12.4869C32.6014 12.817 32.2922 13 31.9494 13H16.0506C15.7078 13 15.3985 12.8169 15.3063 12.4868C15.1656 11.9836 15 11.0598 15 9.5ZM22.5 9C21.9477 9 21.5 9.44772 21.5 10C21.5 10.5523 21.9477 11 22.5 11H25.5C26.0522 11 26.5 10.5523 26.5 10C26.5 9.44772 26.0522 9 25.5 9H22.5Z"
            fill="#333333"
          />{' '}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16.0378 19.218C12.7075 18.1878 13.5479 16.3488 14.8187 15H33.4599C34.4758 16.2976 35.021 18.0489 31.9495 19.0973C31.9829 19.3938 32 19.6951 32 20C32 24.4183 28.4182 28 24 28C19.5817 28 16 24.4183 16 20C16 19.7364 16.0128 19.4755 16.0378 19.218ZM23.7274 20C26.3703 20 28.4172 19.8602 29.9879 19.6157C29.9959 19.7427 30 19.8708 30 20C30 23.3137 27.3137 26 24 26C20.6863 26 18 23.3137 18 20C18 19.8942 18.0027 19.7891 18.0081 19.6847C19.4705 19.8865 21.3459 20 23.7274 20Z"
            fill="#333333"
          />{' '}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32.4175 34.5991C30.6387 31.8326 27.5333 30 24 30C20.4653 30 17.3589 31.8339 15.5805 34.6021C15.2558 34.1035 14.753 33.7184 14.1331 33.5523L12.2012 33.0347C10.8676 32.6773 9.49672 33.4688 9.13936 34.8024L8.36291 37.7002C8.00555 39.0339 8.79701 40.4047 10.1307 40.7621L12.0625 41.2797C12.7457 41.4628 13.4385 41.3444 14 41.0061C14.0033 41.5556 14.4497 42 15 42C15.5522 42 16 41.5523 16 41V40C16 39.619 16.0266 39.2442 16.0781 38.8774L21.2821 40.2717C21.7607 41.2928 22.7977 42 24 42C25.2022 42 26.2393 41.2928 26.7179 40.2717L31.9218 38.8774C31.9733 39.2442 32 39.619 32 40V41C32 41.5523 32.4477 42 33 42C33.549 42 33.9948 41.5575 33.9999 41.0096C34.5606 41.3458 35.2516 41.4631 35.933 41.2805L37.8648 40.7629C39.1985 40.4055 39.9899 39.0347 39.6326 37.701L38.8561 34.8032C38.4988 33.4696 37.1279 32.6781 35.7943 33.0355L33.8624 33.5531C33.244 33.7188 32.7422 34.1024 32.4175 34.5991ZM16.603 36.9474C17.6809 34.3382 20.0993 32.4236 23 32.0619V36.1707C22.0956 36.4903 21.3903 37.2313 21.1198 38.1577L16.603 36.9474ZM31.397 36.9474C30.319 34.3382 27.9006 32.4236 25 32.0619V36.1707C25.9043 36.4903 26.6096 37.2313 26.8801 38.1577L31.397 36.9474ZM24 40C24.5522 40 25 39.5523 25 39C25 38.4477 24.5522 38 24 38C23.4477 38 23 38.4477 23 39C23 39.5523 23.4477 40 24 40Z"
            fill="#333333"
          />{' '}
        </svg>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {driver}
          </h4>
          <span className="text-sm font-medium">Total Drivers</span>
        </div>
      </div>
    </div>
  );
};

export default CardTwo;