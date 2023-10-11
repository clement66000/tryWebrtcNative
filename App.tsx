// @ts-ignore
window.RTCPeerConnection = window.RTCPeerConnection || RTCPeerConnection;
// @ts-ignore
window.RTCIceCandidate = window.RTCIceCandidate || RTCIceCandidate;
// @ts-ignore
window.RTCSessionDescription =
  // @ts-ignore
  window.RTCSessionDescription || RTCSessionDescription;
// @ts-ignore
window.MediaStream = window.MediaStream || MediaStream;
// @ts-ignore
window.MediaStreamTrack = window.MediaStreamTrack || MediaStreamTrack;
// @ts-ignore
window.navigator.mediaDevices = window.navigator.mediaDevices || mediaDevices;
// @ts-ignore
window.navigator.getUserMedia =
  // @ts-ignore
  window.navigator.getUserMedia || mediaDevices.getUserMedia;

import React, {useEffect, useState} from 'react';
import {Button, PermissionsAndroid, Text, View} from 'react-native';
import {
  mediaDevices,
  MediaStream,
  MediaStreamTrack,
  RTCIceCandidate,
  RTCPeerConnection,
  RTCSessionDescription,
} from 'react-native-webrtc';
import Sip from '@khateeb00/react-jssip';
import RNCallKeep from 'react-native-callkeep';

const options = {
  ios: {
    appName: 'My app name',
    supportsVideo: false,
  },
  android: {
    additionalPermissions: [
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    ],
    alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
  },
};
RNCallKeep.setup(options);

const App = () => {
  const [callUUID, setCallUUID] = useState('');
  const [callingNumber, setCallingNumber] = useState('');
  const [logText, setLog] = useState('');
  const [heldCalls, setHeldCalls] = useState({}); // callKeep uuid: held
  const [mutedCalls, setMutedCalls] = useState({}); // callKeep uuid: muted
  const [calls, setCalls] = useState({}); // callKeep uuid: number

  Sip.register({
    websocket: 'wss://freeswitch1.your-avatar.eu:7443',
    username: 'jlessart',
    domain: 'avatar.com',
    password: '3ticadmin',
    name: 'Jlessart',
  });

  const eventhandler = Sip.on('call_received', e => {
    let uid = e._request.call_id;
    setCallingNumber(e._remote_identity._uri._user);
    setCallUUID(uid);
    RNCallKeep.displayIncomingCall(
      e._request.call_id,
      'toto',
      'utilisateur certifie ' + e._remote_identity._uri._user,
      'number',
    );
  });
  const onAnswerCallAction = () => {
    console.log('callUUID dans le answer', callUUID)
    Sip.answerCall(callUUID)
  };

  const onEndCallAction = () => {
    Sip.hangupCall(callUUID);
  };


  const call = () => {
    Sip.makeCall('sip:0619150747@avatar.com').then(data => {

    });
  };

  useEffect(() => {
    RNCallKeep.setAvailable(true);
    eventhandler;
    RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
    RNCallKeep.addEventListener('endCall', onEndCallAction);
    // @ts-ignore
    // RNCallKeep.addEventListener('answerCall', onAnswerCallAction);
    return () => {
      RNCallKeep.removeEventListener('answerCall');
      RNCallKeep.removeEventListener('endCall');
    };
  }, [eventhandler]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
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
