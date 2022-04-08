import React, { Component } from "react";
import Mp3 from '@/assets/music.mp3'

export default class BgMusic extends Component {
  render() {
    return (
      <audio autoPlay>
        <source src={Mp3} />
      </audio>
    );
  }
}

