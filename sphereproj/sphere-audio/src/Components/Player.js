import React, { useState, useEffect } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

const Player = ({ accessToken, trackUri, setAudioState }) => {
    const [play, setPlay] = useState(false);
    
    useEffect(() => {
        setPlay(false);
        setAudioState(play);
    }, [])

    return (
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={state => !state.isPlaying && setPlay(false)}
            play={play}
            uris={trackUri ? trackUri : []}
            styles={{
            activeColor: "#fff",
            bgColor: "#333",
            color: "#fff",
            loaderColor: "#fff",
            sliderColor: "#1cb954",
            trackArtistColor: "#ccc",
            trackNameColor: "#fff",
            height: "55px",
      }}
    />
    )
}

export default Player;