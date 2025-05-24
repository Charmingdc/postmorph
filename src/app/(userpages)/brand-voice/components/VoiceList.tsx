import NoDataCard from '@/components/ui/no-data-card';
import VoiceBox from './VoiceBox';

const VoiceList = () => {
  const voices: { name: string; description: string }[] = [
    {
      name: 'Friendly Expert',
      description:
        'Explains things clearly, uses approachable language, and simplifies concepts.'
    },
    {
      name: 'Corporate Pro',
      description:
        'Uses formal tone, structured messaging, and industry jargon where appropriate.'
    },
    {
      name: 'Indie Hacker',
      description:
        'Concise, energetic, and personal — great for X and startup-style posts.'
    }
  ];

  return (
    <div className='w-full h-full flex flex-col gap-3 items-center mt-4'>
      {voices.length > 0 ? (
        voices.map((voice, index) => (
          <VoiceBox
            key={index}
            index={index}
            name={voice.name}
            description={voice.description}
          />
        ))
      ) : (
        <NoDataCard
          title='No custom styles yet'
          message={`You haven't added any custom writing style, click the "Add New Custom Voice" button above to add one.`}
        />
      )}
    </div>
  );
};

export default VoiceList;