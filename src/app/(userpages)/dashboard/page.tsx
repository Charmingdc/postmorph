import CreditMetrics from './components/CreditMetrics';
import RecentDrafts from './components/RecentDrafts';

const Dashboard = () => {
  return (
    <main className='w-full flex flex-col items-center'>
      <CreditMetrics />
      <RecentDrafts />
    </main>
  );
};

export default Dashboard
