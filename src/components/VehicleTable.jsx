import { useState, useEffect } from 'react';
import adminInstance from '../instance/instance';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VehicleTable = () => {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState([]);
  const [reload, setReload] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    adminInstance
      .get('/getVehicles')
      .then((response) => {
        setVehicle(response.data.vehicles);
        console.log(response);
      })
      .catch((error) => {
        const { response, message } = error;
        const errorMessage = response ? response.data.message : message;
        toast.error(errorMessage);
      });
  }, [reload]);

  const hideVehicle = (vehicleId) => {
    Swal.fire({
      title: 'Hide Vehicle',
      text: 'Are you sure want to Hide this vehicle',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hide',
    }).then((result) => {
      if (result.isConfirmed) {
        adminInstance
          .post('/hideVehicle', { vehicleId })
          .then((response) => {
            toast.success(response.data.message);
            setReload(response);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    });
  };

  const showVehicle = (vehicleId) => {
    Swal.fire({
      title: 'Show Vehicle',
      text: 'Are you sure want to show the vehicle',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'green',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Show',
    }).then((result) => {
      if (result.isConfirmed) {
        adminInstance
          .post('/showVehicle', { vehicleId })
          .then((response) => {
            setReload(response);
            toast.success(response.data.message);
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    });
  };

  const handleEdit = (vehicleId) => {
    navigate('/admin/vehicle/editVehicle', { state: { vehicleId } });
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <>
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold uppercase text-black dark:text-white">
          Vehicle CATEGORY
        </h4>

        <div className="flex flex-col">
          <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
            <div className="p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                service
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Capacity
              </h5>
            </div>
            <div className="p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Minimum charge
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Fare
              </h5>
            </div>
            <div className="hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>
          {vehicle.map((vehicle, index) => (
            <div
              className="grid grid-cols-3 border-b border-stroke dark:border-strokedark sm:grid-cols-5"
              key={index}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0 cursor-pointer">
                  <img
                    src={vehicle.image}
                    alt="Cab"
                    onClick={() => handleImageClick(vehicle.image)}
                    className="h-10"
                  />
                </div>
                <p className="hidden text-black dark:text-white sm:block">
                  {vehicle.service}
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">
                  {vehicle.persons} Person
                </p>
              </div>

              <div className="flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-meta-3">RS: {vehicle.minCharge}</p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">
                  RS: {vehicle.price} /km
                </p>
              </div>

              <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <div className="flex flex-col gap-4">
                  {vehicle.block ? (
                    <button
                      className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger"
                      onClick={() => {
                        showVehicle(vehicle._id);
                        setReload(!reload, '1');
                      }}
                    >
                      Show
                    </button>
                  ) : (
                    <button
                      className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                      onClick={() => {
                        hideVehicle(vehicle._id);
                        setReload(!reload, 'i');
                      }}
                    >
                      Hide
                    </button>
                  )}
                  <button
                    className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning"
                    onClick={() => {
                      handleEdit(vehicle._id);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-primary px-4 py-2 font-medium text-white"
            onClick={() => navigate('/admin/vehicle/addVehicle')}
          >
            Add
          </button>
        </div>
        {selectedImage && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <div className="relative mx-auto max-w-2xl">
              <img
                src={selectedImage}
                alt="Selected License"
                className="max-h-full"
              />
              <button
                className="absolute right-2 top-2 font-extrabold text-white"
                onClick={closeModal}
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default VehicleTable;
