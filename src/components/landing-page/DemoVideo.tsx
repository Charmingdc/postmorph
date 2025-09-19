"use client";
import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeOff } from "lucide-react";

const DemoVideo = () => {
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const playButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>("0");
  const [videoDuration, setVideoDuration] = useState<string>("0");

  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;

  const playPause = () => {
    if (videoPlayerRef.current && playButtonRef.current) {
      const videoPlayer = videoPlayerRef.current;
      const button = playButtonRef.current;

      // apply fade transition
      button.style.transition = "opacity 0.5s ease-in-out";
      button.style.opacity = "1";

      // update video current time state every second
      setInterval(() => {
        if (!videoPlayer.ended)
          setCurrentTime(videoPlayer.currentTime.toFixed(2));
      }, 1000);

      // toggle video status
      if (videoPlayer.paused) {
        videoPlayer.play();
        setIsVideoPlaying(true);

        setTimeout(() => {
          button.style.opacity = "0";
        }, 2500);
      } else {
        videoPlayer.pause();
        setIsVideoPlaying(false);
        button.style.opacity = "1";
      }
    }
  };

  const toggleVideoSound = () => {
    if (videoPlayerRef.current) {
      const volume = videoPlayerRef.current.volume;

      if (volume === 1) {
        videoPlayerRef.current.volume = 0;
        setIsVideoMuted(true);
      } else {
        videoPlayerRef.current.volume = 1;
        setIsVideoMuted(false);
      }
    }
  };

  useEffect(() => {
    if (videoPlayerRef.current)
      setVideoDuration(videoPlayerRef.current.duration.toFixed(2));
  }, [videoDuration, isVideoPlaying]);

  return (
    <>
      <video
        ref={videoPlayerRef}
        className="w-[100%] h-[50vh] relative border rounded-lg"
      >
        <source
          src={`${baseUrl}/storage/v1/object/public/Postmorph%20Public%20Assets/lv_0_20250919111125.mp4`}
          type="video/mp4"
        />
        <p>Your browser does not support playing videos.</p>
      </video>

      <button
        ref={playButtonRef}
        onClick={playPause}
        className="w-[4rem] h-[4rem] absolute top-[45%] left-[40%] flex items-center justify-center bg-white/20 rounded-full"
      >
        {isVideoPlaying ? <Pause size={35} /> : <Play size={35} />}
      </button>

      <div className="w-full absolute bottom-[16%] flex items-center justify-between px-[2.5rem]">
        <p className="text-sm">
          {currentTime}:<strong> {videoDuration} </strong>
        </p>

        <button
          className="text-muted-foreground transition-text duration-300 hover:text-primary"
          onClick={() => toggleVideoSound()}
        >
          {isVideoMuted ? <VolumeOff /> : <Volume2 />}
        </button>
      </div>
    </>
  );
};

export default DemoVideo;
