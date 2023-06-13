import Breadcrumb from '../components/Breadcrumb';
import RequestTable from '../components/RequestTable';
import DefaultLayout from '../layout/DefaultLayout';

const Request = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Request" />

      <div className="flex flex-col gap-10">
        <RequestTable />
      </div>
    </DefaultLayout>
  );
};

export default Request;
