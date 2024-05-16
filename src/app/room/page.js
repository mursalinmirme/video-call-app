"use client";

import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
  ControlBar,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';
import { useEffect, useState } from 'react';

export default function AudioCall() {
// TODO: get user input for room and name
const room = "TestLive";
const name = "jamil2001";
const [token, setToken] = useState("");
const [userNames, setUserNames] = useState("");


if(userNames !== ""){
    const getName = prompt("Whats your Name?");
    console.log("I got My Name is", getName);
}

useEffect(() => {
  (async () => {
    try {
      const resp = await fetch(`http://localhost:5000/getToken?room=${room}&username=${name}`);
      const data = await resp.json();
      console.log("Get token ", data);
      setToken(data.token);
    } catch (eee) {
    //   console.error(e);
    console.log("something went wrong", eee.message);
    }
  })();
}, []);


if (token === "") {
  return <div>Getting token...</div>;
}

return (
  <LiveKitRoom
    video={true}
    audio={true}
    token={token}
    serverUrl={"wss://audio-testing-xux3kb9n.livekit.cloud"}
    // Use the default LiveKit theme for nice styles.
    data-lk-theme="default"
    style={{ height: '100dvh' }}
  >
    {/* Your custom component with basic video conferencing functionality. */}
    <MyVideoConference />
    {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
    <RoomAudioRenderer />
    {/* Controls for the user to start/stop audio, video, and screen
    share tracks and to leave the room. */}
    <ControlBar />
  </LiveKitRoom>
);
}
function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}