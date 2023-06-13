import Breadcrumb from '../components/Breadcrumb';
import UserTable from '../components/UserTable';
import DefaultLayout from '../layout/DefaultLayout';

const Users = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />
      <div className="flex flex-col gap-10">
        <UserTable />
      </div>
    </DefaultLayout>
  );
};

export default Users;
