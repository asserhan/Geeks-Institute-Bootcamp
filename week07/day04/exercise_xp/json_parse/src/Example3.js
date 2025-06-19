import React, { Component } from "react";
import data from "./user.json";

class Example3 extends Component {
  render() {
    return (
      <div>
        <h2>Experiences</h2>
        {data.Experiences.map((exp, index) => (
          <div key={index}>
            <h3>{exp.CompanyName}</h3>
            {exp.Roles.map((role, i) => (
              <div key={i}>
                <strong>{role.Title}</strong>
                <p>{role.Years}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;
