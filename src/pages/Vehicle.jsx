import Breadcrumb from '../components/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import VehicleTable from '../components/VehicleTable';

const Vehicle = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Vehicle" />

      <div className="flex flex-col gap-10">
        <VehicleTable />
      </div>
    </DefaultLayout>
  );
};

export default Vehicle;
