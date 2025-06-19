import React, { Component } from "react";
import data from "./user.json";

class Example1 extends Component {
  render() {
    return (
      <div>
        <h2>Social Medias</h2>
        <ul>
          {data.SocialMedias.map((media, index) => (
            <li key={index}>{media}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example1;
