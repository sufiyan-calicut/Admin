import React from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import '../styles/loader.css';
import { loginValidation } from '../helpers/validate';
import adminInstance from '../instance/instance';
import Loader from './Loader';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const Formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validate: loginValidation,
    validateOnChange: false,
    //submit
    onSubmit: async (value) => {
      try {
        setLoading(true);
        await adminInstance.post('/login', { value }).then((response) => {
          localStorage.setItem(
            'adminToken',
            JSON.stringify(response.data.token)
          );
          toast.success(response.data.message);
          navigate('/admin');
          setLoading(false);
        });
      } catch (error) {
        const { response, message } = error;
        const errorMessage = response ? response.data.message : message;
        toast.error(errorMessage);
        setLoading(false);
      }
    },
  });

  return (
    <>
      {loading && (
        <div className="flex h-screen items-center justify-center">
          <Loader/>
        </div>
      )}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <div className="dark:bg-gray-800 dark:border-gray-700 w-full rounded-lg bg-white shadow dark:border sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-gray-900 text-center text-xl font-bold uppercase leading-tight tracking-tight dark:text-white md:text-2xl">
                Admin
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={Formik.handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 dark:text-white sm:text-sm"
                    {...Formik.getFieldProps('email')}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="text-gray-900 mb-2 block text-sm font-medium dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 block w-full rounded-lg border p-2.5 dark:text-white sm:text-sm"
                    {...Formik.getFieldProps('password')}
                  />
                </div>
                <button
                  type="submit"
                  className="focus:ring-primary-300  dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
