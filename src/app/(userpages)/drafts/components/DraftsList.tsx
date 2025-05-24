import NoDataCard from '@/components/ui/no-data-card';
import DraftBox from './DraftBox';
import { demoDrafts } from '../lib/constants';

const DraftsList = () => {
  return (
    <div className='w-full flex flex-col justify-center gap-5 mb-10 md:grid md:grid-cols-3'>
      {demoDrafts.length > 0 ? (
        demoDrafts.map(draft => <DraftBox key={draft.id} draft={draft} />)
      ) : (
        <NoDataCard
          title='No drafts saved'
          message={`You don't have any currently saved draft`}
        />
      )}
    </div>
  );
};

export default DraftsList;
