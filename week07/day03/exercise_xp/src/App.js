import React from "react";
import ErrorBoundary from "./ErrorBondary";
import ColorComponent from "./colorComponent";

// 🔴 BuggyCounter Component
class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  handleClick = () => {
    if (this.state.counter === 5) {
      throw new Error("I crashed!");
    }
    this.setState({ counter: this.state.counter + 1 });
  };

  render() {
    return (
      <div>
        <h1 onClick={this.handleClick}>Counter: {this.state.counter}</h1>
      </div>
    );
  }
}

// 🟢 Child Component (for unmounting)
class Child extends React.Component {
  componentWillUnmount() {
    alert("unmounted");
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

// 🟣 App Component
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true, // for controlling Child component
    };
  }

  deleteChild = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>

        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>

        <ColorComponent />

        {/* 🧩 Unmounting Demo */}
        {this.state.show ? <Child /> : null}
        <button onClick={this.deleteChild}>Delete</button>
      </div>
    );
  }
}

export default App;
