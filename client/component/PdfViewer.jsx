import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Video from 'react-native-video';

const PdfViewer = ({ pdfUrl, audioUrl }) => {
  const [isPlaying, setPlaying] = useState(false);

  const toggleAudio = () => {
    setPlaying(!isPlaying);
  };

  return (
    <View>
      {/* PDF Viewer */}
      <WebView  style={{width:'100%'}}
        source={{ uri: `https://docs.google.com/gview?embedded=true&url=${pdfUrl}` }}
        
      />

      {/* Audio Player */}
      <TouchableOpacity onPress={toggleAudio}>
        <Text>{isPlaying ? 'Pause Audio' : 'Play Audio'}</Text>
      </TouchableOpacity>

      {isPlaying && (
        <Video
          source={{ uri: audioUrl }}
          paused={!isPlaying}
          onEnd={() => setPlaying(false)}
          onError={(error) => console.error('Error playing audio', error)}
        />
      )}
    </View>
  );
};

export default PdfViewer;
