import { useState, useEffect } from 'react';
import adminInstance from '../instance/instance';
import Swal from 'sweetalert2';
import { toast } from "react-hot-toast";

const UserTable = () => {
  const [user, setUser] = useState([]);
  const [reload, setReload] = useState();

  useEffect(() => {
    adminInstance.get('/getUsers').then((response) => {
      setUser(response.data.users);
    }).catch((error) => {
      const { response, message } = error;
      const errorMessage = response ? response.data.message : message;
      toast.error(errorMessage);
    });
  }, [reload]);

  const blockUser = (userId) => {
    Swal.fire({
      title: 'Block user',
      text: 'Are you sure want to block the user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Block',
    }).then((result) => {
      if (result.isConfirmed) {
        adminInstance
          .post('/blockUser', { userId })
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
  const unBlockUser = (userId) => {
    Swal.fire({
      title: 'Unblock user',
      text: 'Are you sure want to unBlock the user',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Unblock',
    }).then((result) => {
      if (result.isConfirmed) {
        adminInstance
          .post('/unBlockUser', { userId })
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

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left uppercase dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                User Name
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Phone
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          {user.map((user,index) => (
            <tbody>
              <tr key={index}>
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {user.userName}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.email}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.phone}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    {user.block ? (
                      <button
                        className="inline-flex rounded-full bg-danger bg-opacity-10 px-3 py-1 text-sm font-medium text-danger"
                        onClick={() => unBlockUser(user._id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="inline-flex rounded-full bg-success bg-opacity-10 px-3 py-1 text-sm font-medium text-success"
                        onClick={() => blockUser(user._id)}
                      >
                        Block
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default UserTable;
