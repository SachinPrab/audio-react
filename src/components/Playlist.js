import React from 'react';

const Playlist = ({ audioFiles, handlePlay }) => {
  return (
    <ul>
      {audioFiles.map((audio, index) => (
        <li key={audio.id} onClick={() => handlePlay(index)}>
          {audio.name}
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
