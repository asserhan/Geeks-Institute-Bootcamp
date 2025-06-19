import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      input: "",
      response: ""
    };
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:8000/api/hello");
    const data = await res.json();
    this.setState({ message: data.message });
  }

  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8000/api/world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ input: this.state.input })
    });
    const data = await res.json();
    this.setState({ response: data.message });
  };

  render() {
    return (
      <div className="App">
        <h1>{this.state.message}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.input}
            onChange={this.handleChange}
          />
          <button type="submit">Send</button>
        </form>
        <h2>{this.state.response}</h2>
      </div>
    );
  }
}

export default App;
