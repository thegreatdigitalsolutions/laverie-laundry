"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const startMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  }, []);

  const stopMusic = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const toggleMusic = useCallback(() => {
    if (playing) stopMusic();
    else void startMusic();
  }, [playing, startMusic, stopMusic]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.28;

    // Attempt playback on the first page load. Browsers may block audible autoplay;
    // in that case, start on the visitor's first interaction.
    void startMusic();
    const resumeOnFirstInteraction = () => {
      void startMusic();
      window.removeEventListener("pointerdown", resumeOnFirstInteraction);
      window.removeEventListener("keydown", resumeOnFirstInteraction);
    };
    window.addEventListener("pointerdown", resumeOnFirstInteraction, { once: true });
    window.addEventListener("keydown", resumeOnFirstInteraction, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resumeOnFirstInteraction);
      window.removeEventListener("keydown", resumeOnFirstInteraction);
    };
  }, [startMusic]);

  return (
    <>
      <audio ref={audioRef} src="/audio/laverie-elegant.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={playing ? "Matikan musik latar" : "Nyalakan musik latar"}
        title={playing ? "Matikan musik" : "Nyalakan musik"}
        className="fixed bottom-5 right-5 z-[80] flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-[#17332F]/90 text-[#F3F1EA] shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-[#244A43] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9CC8BE]"
      >
        {playing ? <Volume2 className="h-[18px] w-[18px]" /> : <VolumeX className="h-[18px] w-[18px]" />}
      </button>
    </>
  );
}
