import { useState, useEffect } from 'react';
import adminInstance from '../instance/instance';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';

const RequestTable = () => {
  const [request, setRequest] = useState([]);
  const [reload, setReload] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    adminInstance
      .get('/getRequests')
      .then((response) => {
        setRequest(response.data.requests);
      })
      .catch((error) => {
        const { response, message } = error;
        const errorMessage = response ? response.data.message : message;
        toast.error(errorMessage);
      });
  }, [reload]);

  const approveRequest = (requestId) => {
    Swal.fire({
      title: 'Approve request',
      text: 'Are you sure want to approve this request',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve',
    }).then((result) => {
      if (result.isConfirmed) {
        adminInstance
          .post('/approveRequest', { requestId })
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

  const declineRequest = (requestId) => {
    Swal.fire({
      title: 'Decline Request',
      text: 'Are you sure want to decline this request',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Decline',
    }).then((result) => {
      if (result.isConfirmed) {
        adminInstance
          .post('/declineRequest', { requestId })
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
        <div className="col-span-1 hidden items-center sm:flex">
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

      {request.map((request, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-3 flex items-center sm:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {request.userName}
              </p>
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {request.email}
            </p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {request.phone}
            </p>
          </div>
          <div className="col-span-2 flex items-center sm:col-span-1">
            <p className="text-sm text-black dark:text-white">
              {request.vehicle}
            </p>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <div className="h-12.5 w-15 rounded-md cursor-pointer">
              <img
                src={request.license}
                alt="License"
                onClick={() => handleImageClick(request.license)}
              />
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4">
              {request.decline ? (
                <p className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger">
                  Declined
                </p>
              ) : (
                <>
                  <button
                    className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                    onClick={() => approveRequest(request._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="inline-flex rounded-full bg-warning bg-opacity-10 px-3 py-1 text-sm font-medium text-warning"
                    onClick={() => declineRequest(request._id)}
                  >
                    Decline
                  </button>
                </>
              )}
            </div>
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
              className="absolute right-2 top-2 text-black font-extrabold"
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

export default RequestTable;
