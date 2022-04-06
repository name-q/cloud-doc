import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import Leaf from '@/assets/leaf.png'


export default class Particles extends Component {

  render() {
    let config = {
      num: [1,3],
      rps: 0.1,
      radius: [5, 10],
      life: [1.5, 3],
      v: [2, 3],
      tha: [90, 160],
      alpha: [0.6, 0],
      scale: [.1, 0.4],
      position: "all",
      body:Leaf,
      cross: "dead",
    //   emitter: "follow",
      random: 15
    };

    return (
      <>
        <ParticlesBg type="custom" config={config} bg={true} />
      </>
    );
  }
}

