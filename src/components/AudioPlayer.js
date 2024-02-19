import React from 'react';

const AudioPlayer = ({ currentAudio, currentTime, handleTimeUpdate, handleEnded }) => {
  return (
    <div>
      {currentAudio && (
        <audio
          src={currentAudio.url}
          controls
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          currentTime={currentTime}
        />
      )}
    </div>
  );
};

export default AudioPlayer;
