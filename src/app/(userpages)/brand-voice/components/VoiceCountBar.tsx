"use client"

import { useState, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

const VoiceCountBar = () => {
  const [voiceCount, setVoiceCount] = useState<number>(0);
  useEffect(() => {
    setVoiceCount(3);
  }, []);
  const percent: number = (voiceCount / 3) * 100;

  return (
    <div className='w-full flex flex-col justify-center gap-2 border-2 border-card p-4 rounded-xl mt-4'>
      <p>
        <strong> 3 </strong> out of <strong> 3 </strong> voices created
      </p>

      <Progress value={percent} />
    </div>
  );
};

export default VoiceCountBar;
