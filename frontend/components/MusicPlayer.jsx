"use client";

const MusicPlayer = ({ src }) => {
  return (
    <audio controls autoPlay>
      <source src={src} type="audio/mp3" />
    </audio>
  );
};

export default MusicPlayer;
