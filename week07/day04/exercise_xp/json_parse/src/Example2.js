import React, { Component } from "react";
import data from "./user.json";

class Example2 extends Component {
  render() {
    return (
      <div>
        <h2>Skills</h2>
        {data.Skills.map((skill, index) => (
          <div key={index}>
            <h4>{skill.Area}</h4>
            <ul>
              {skill.SkillSet.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }
}

export default Example2;
