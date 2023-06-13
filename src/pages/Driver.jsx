import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import DriverTable from '../components/DriverTable';

const Driver = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Driver" />
      <div className="flex flex-col gap-10">
        <DriverTable />
      </div>
    </DefaultLayout>
  );
};

export default Driver;
