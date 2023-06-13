import { toast } from 'react-hot-toast';

//-----------------LOGIN VALIDATION-----------------//

export async function loginValidation(value) {
  const error = {};

  if (!value.email) {
    return (error.email = toast.error('Email Required...!'));
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(value.email)) {
    return (error.email = toast.error('Invalid Email...!'));
  } else if (!value.password) {
    return (error.password = toast.error('Password Required...!'));
  } else if (value.password.length < 5) {
    return (error.password = toast.error('Invalid Password...!'));
  }
}

export async function vehicleValidation(value) {
  const error = {};
  if (!value.service) {
    return (error.service = toast.error('Service Required...!'));
  } else if (!value.persons) {
    return (error.persons = toast.error('Capacity Required...!'));
  } else if (!value.minCharge) {
    return (error.minCharge = toast.error('Minimum Charge Required...!'));
  } else if (!value.price) {
    return (error.price = toast.error('Price Required...!'));
  }
}
