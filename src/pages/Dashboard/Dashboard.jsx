import CardFour from '../../components/CardFour.jsx';
import CardOne from '../../components/CardOne.jsx';
import CardThree from '../../components/CardThree.jsx';
import CardTwo from '../../components/CardTwo.jsx';
import ChartOne from '../../components/ChartOne.jsx';
import ChartTwo from '../../components/ChartTwo.jsx';
import DefaultLayout from '../../layout/DefaultLayout.jsx';

const Dashboard = () => {
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </DefaultLayout>
  );
};

export default Dashboard;
