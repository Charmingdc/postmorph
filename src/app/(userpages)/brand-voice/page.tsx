import VoiceCountBar from './components/VoiceCountBar';
import AddVoiceForm from './components/AddVoiceForm';
import VoiceList from './components/VoiceList';

const Page = () => {
  return (
    <main className='mb-14'>
      <p> Add custom voices that reflects your brand. </p>

      <VoiceCountBar />
      <AddVoiceForm />
      <VoiceList />
    </main>
  );
};

export default Page;
