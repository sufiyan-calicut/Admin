import DefaultLayout from '../layout/DefaultLayout';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import adminInstance from '../instance/instance';
import Loader from './Loader';

const EditVehicle = () => {
  const location = useLocation();
  const { vehicleId } = location.state;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [vehicle, setVehicle] = useState(null);
  const [image, setImage] = useState(null);
  const [service, setService] = useState('');
  const [persons, setPersons] = useState('');
  const [minCharge, setMinCharge] = useState('');
  const [price, setPrice] = useState('');

  const details = {
    service,
    persons,
    minCharge,
    price,
  };

  useEffect(() => {
    adminInstance
      .post('/getVehicleData', { vehicleId })
      .then((response) => {
        setVehicle([response.data.vehicle]);
        setLoading(false);
      })
      .catch((error) => {
        const { response, message } = error;
        const errorMessage = response ? response.data.message : message;
        toast.error(errorMessage);
        navigate('/admin/vehicle');
      });
  }, []);

  const handleImage = (event) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const cabImage = event.target.files[0];
    if (cabImage && validImageTypes.includes(cabImage.type)) {
      setImage(cabImage);
    } else {
      toast.error('Please select a valid image file');
    }
  };

  // -----------------------------------------------------------UPDATE VEHICLE DETAILS-------------------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEmpty = Object.values(details).every((x) => !x);
    if (isEmpty) {
      toast.error('Please update the missing details');
    } else {
      const cabImage = image;
      if (!cabImage) {
        toast.error('Please Add an Image');
      } else {
        toast.loading('Processing...');
        let imageData;
        const reader = new FileReader();
        reader.readAsDataURL(cabImage);
        reader.onloadend = async () => {
          imageData = reader.result;
          adminInstance
            .patch('/updateVehicleDetails', { details, imageData, vehicleId })
            .then((response) => {
              toast.dismiss();
              navigate('/admin/vehicle');
              toast.success(response.data.message);
            })
            .catch((error) => {
              console.log(error);
              toast.dismiss();
              const { response, message } = error;
              const errorMessage = response ? response.data.message : message;
              toast.error(errorMessage);
            });
        };
      }
    }
  };
  return (
    <DefaultLayout>
      {loading && (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="mx-auto max-w-270">
        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Cab details
                </h3>
              </div>
              {vehicle &&
                vehicle.map((vehicle, index) => (
                  <div className="p-7" key={index}>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="service"
                          >
                            Service
                          </label>
                          <div className="relative">
                            <input
                              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              type="text"
                              name="service"
                              id="service"
                              placeholder="Service"
                              defaultValue={vehicle.service}
                              onChange={(e) => setService(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="w-full sm:w-1/2">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="persons"
                          >
                            Capacity
                          </label>
                          <input
                            className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="text"
                            name="persons"
                            id="persons"
                            placeholder="Capacity"
                            defaultValue={vehicle.persons}
                            onChange={(e) => setPersons(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="minCharge"
                        >
                          Minimum charge
                        </label>
                        <div className="relative">
                          <input
                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                            type="number"
                            name="minCharge"
                            id="minCharge"
                            placeholder="Minimum charge"
                            defaultValue={vehicle.minCharge}
                            onChange={(e) => setMinCharge(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="price"
                        >
                          Fare per km
                        </label>
                        <input
                          className="w-full rounded border border-stroke bg-gray px-4.5 py-3 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                          type="number"
                          name="price"
                          id="price"
                          placeholder="Fare per km"
                          defaultValue={vehicle.price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>

                      <div className="mb-5.5">
                        <label
                          className="mb-3 block text-sm font-medium text-black dark:text-white"
                          htmlFor="image"
                        >
                          Image
                        </label>
                        <div
                          id="FileUpload"
                          className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border-2 border-dashed border-primary bg-gray px-4 py-4 dark:bg-meta-4 sm:py-7.5"
                        >
                          <input
                            onChange={handleImage}
                            name="image"
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                          />
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M1.99967 9.33337C2.36786 9.33337 2.66634 9.63185 2.66634 10V12.6667C2.66634 12.8435 2.73658 13.0131 2.8616 13.1381C2.98663 13.2631 3.1562 13.3334 3.33301 13.3334H12.6663C12.8431 13.3334 13.0127 13.2631 13.1377 13.1381C13.2628 13.0131 13.333 12.8435 13.333 12.6667V10C13.333 9.63185 13.6315 9.33337 13.9997 9.33337C14.3679 9.33337 14.6663 9.63185 14.6663 10V12.6667C14.6663 13.1971 14.4556 13.7058 14.0806 14.0809C13.7055 14.456 13.1968 14.6667 12.6663 14.6667H3.33301C2.80257 14.6667 2.29387 14.456 1.91879 14.0809C1.54372 13.7058 1.33301 13.1971 1.33301 12.6667V10C1.33301 9.63185 1.63148 9.33337 1.99967 9.33337Z"
                                  fill="#3C50E0"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.5286 1.52864C7.78894 1.26829 8.21106 1.26829 8.4714 1.52864L11.8047 4.86197C12.0651 5.12232 12.0651 5.54443 11.8047 5.80478C11.5444 6.06513 11.1223 6.06513 10.8619 5.80478L8 2.94285L5.13807 5.80478C4.87772 6.06513 4.45561 6.06513 4.19526 5.80478C3.93491 5.54443 3.93491 5.12232 4.19526 4.86197L7.5286 1.52864Z"
                                  fill="#3C50E0"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M7.99967 1.33337C8.36786 1.33337 8.66634 1.63185 8.66634 2.00004V10C8.66634 10.3682 8.36786 10.6667 7.99967 10.6667C7.63148 10.6667 7.33301 10.3682 7.33301 10V2.00004C7.33301 1.63185 7.63148 1.33337 7.99967 1.33337Z"
                                  fill="#3C50E0"
                                />
                              </svg>
                            </span>
                            <p>
                              <span className="text-primary">
                                Click to upload
                              </span>{' '}
                              or drag and drop
                            </p>
                            <p className="mt-1.5">SVG, PNG, JPG or GIF</p>
                            <p>(max, 800 X 800px)</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-4.5">
                        <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white">
                          Cancel
                        </button>
                        <button
                          className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:shadow-1"
                          type="submit"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default EditVehicle;
