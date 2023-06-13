import { useState, useEffect } from 'react';
import adminInstance from '../instance/instance';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

const DriverTable = () => {
  const [driver, setDriver] = useState([]);
  const [reload, setReload] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    adminInstance
      .get('/getDrivers')
      .then((response) => {
        setDriver(response.data.drivers);
        console.log(response.data.drivers);
      })
      .catch((error) => {
        const { response, message } = error;
        const errorMessage = response ? response.data.message : message;
        toast.error(errorMessage);
      });
  }, [reload]);

  const blockDriver = (driverId) => {
    Swal.fire({
      title: 'Block driver',
      text: 'Are you sure want to block the driver',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Block',
    }).then((result) => {
      if (result.isConfirmed) {
        adminInstance
          .post('/blockDriver', { driverId })
          .then((response) => {
            setReload(!reload, '!');
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    });
  };
  const unBlockDriver = (driverId) => {
    Swal.fire({
      title: 'Unblock driver',
      text: 'Are you sure want to unBlock the driver',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Unblock',
    }).then((result) => {
      if (result.isConfirmed) {
        adminInstance
          .post('/unBlockDriver', { driverId })
          .then((response) => {
            setReload(!reload, '!');
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold uppercase text-black dark:text-white">
          Driver
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 uppercase dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center sm:col-span-2">
          <p className="font-medium">User Name</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Email</p>
        </div>
        <div className="col-span-1  hidden items-center sm:flex">
          <p className="font-medium">Phone</p>
        </div>
        <div className="col-span-2 flex items-center sm:col-span-1">
          <p className="font-medium">Vehicle</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">License</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Action</p>
        </div>
      </div>
      {driver.map((driver, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-3 flex items-center sm:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <img src={driver.profilePhoto} alt="Profile Photo" />
              </div>
              <p className="text-sm text-black dark:text-white">
                {driver.userName}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{driver.email}</p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{driver.phone}</p>
          </div>
          <div className="col-span-2 flex items-center sm:col-span-1">
            <p className="text-sm text-black dark:text-white">
              {driver.vehicle}
            </p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <div className="h-12.5 w-15 rounded-md cursor-pointer">
              <img
                src={driver.license}
                alt="License"
                onClick={() => handleImageClick(driver.license)}
              />
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            {driver.block ? (
              <button
                className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger"
                onClick={() => unBlockDriver(driver._id)}
              >
                Unblock
              </button>
            ) : (
              <button
                className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                onClick={() => blockDriver(driver._id)}
              >
                Block
              </button>
            )}
          </div>
        </div>
      ))}
      {selectedImage && (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
          <div className="relative mx-auto max-w-2xl">
            <img
              src={selectedImage}
              alt="Selected License"
              className="max-h-full"
            />
            <button
              className="absolute right-2 top-2 font-extrabold text-black"
              onClick={closeModal}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverTable;
