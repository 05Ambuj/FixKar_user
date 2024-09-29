// useVoiceToText.js
import { useState, useEffect } from 'react';
import Voice from '@react-native-voice/voice';

const useVoiceToText = (setSearchText) => {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => {
    setIsListening(true);
  };

  const onSpeechEnd = () => {
    setIsListening(false);
  };

  const onSpeechResults = (event) => {
    if (event.value && event.value.length > 0) {
      setSearchText(event.value[0]);
    }
  };

  const startListening = async () => {
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error('Error starting voice recognition:', error);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.error('Error stopping voice recognition:', error);
    }
  };

  return { isListening, startListening, stopListening };
};

export default useVoiceToText;
