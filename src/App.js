import React, { useState, useEffect } from 'react';
import { addAudioFile, getAllAudioFiles } from './indexedDB';
import Uploader from './components/Uploader';
import Playlist from './components/Playlist';
import AudioPlayer from './components/AudioPlayer';

const App = () => {
  const [audioFiles, setAudioFiles] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    getAllAudioFiles().then((files) => {
      setAudioFiles(files);
      setCurrentAudio(files[files.length - 1]);
      setCurrentIndex(files.length - 1);
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const newAudio = {
        id: Date.now(),
        name: file.name,
        url: event.target.result,
      };
      addAudioFile(newAudio).then(() => {
        setAudioFiles([...audioFiles, newAudio]);
      }).catch((error) => {
        console.error(error);
      });
    };
    reader.readAsDataURL(file);
  };

  const handlePlay = (index) => {
    setCurrentAudio(audioFiles[index]);
    setCurrentIndex(index);
  };

  const handleTimeUpdate = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  const handleEnded = () => {
    const nextIndex = (currentIndex + 1) % audioFiles.length;
    setCurrentAudio(audioFiles[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  return (
    <div>
      <Uploader handleUpload={handleUpload} />
      <Playlist audioFiles={audioFiles} handlePlay={handlePlay} />
      <AudioPlayer
        currentAudio={currentAudio}
        currentTime={currentTime}
        handleTimeUpdate={handleTimeUpdate}
        handleEnded={handleEnded}
      />
    </div>
  );
};

export default App;
