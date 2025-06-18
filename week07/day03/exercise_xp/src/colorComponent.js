import React from 'react';

class ColorComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteColor: "red"
    };
  }

  // ✅ When component mounts: set color to yellow after 1 second
  componentDidMount() {
    setTimeout(() => {
      this.setState({ favoriteColor: "yellow" });
    }, 1000);
  }

  // ✅ Called right before DOM is updated
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("in getSnapshotBeforeUpdate");
    return null; // required even if not used
  }

  // ✅ Called immediately after update
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("after update");
  }

  render() {
    return (
      <div>
        <h1>{this.state.favoriteColor}</h1>
      </div>
    );
  }
}

export default ColorComponent;
