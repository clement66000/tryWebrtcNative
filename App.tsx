window.RTCPeerConnection = window.RTCPeerConnection || RTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || RTCIceCandidate;
window.RTCSessionDescription =
  window.RTCSessionDescription || RTCSessionDescription;
window.MediaStream = window.MediaStream || MediaStream;
window.MediaStreamTrack = window.MediaStreamTrack || MediaStreamTrack;
window.navigator.mediaDevices = window.navigator.mediaDevices || mediaDevices;
window.navigator.getUserMedia =
  window.navigator.getUserMedia || mediaDevices.getUserMedia;

import React from 'react';
import {Button, Text, View} from 'react-native';
import {
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import Sip from '@khateeb00/react-jssip';

const App = () => {
  Sip.register({
    websocket: 'wss://freeswitch1.your-avatar.eu:7443',
    username: 'jlessart',
    domain: 'avatar.com',
    password: '3ticadmin',
    name: 'Jlessart',
  });

  const call = () => {
    Sip.makeCall('sip:0619150747@avatar.com').then(data => {
      console.log(data);
    });
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>App</Text>
      <Text>App</Text>
      <Text>App</Text>
      <Text>App</Text>
      <Text>App</Text>
      <Button
        title={'Call'}
        onPress={() => {
          call();
        }}
      />
    </View>
  );
};

export default App;
