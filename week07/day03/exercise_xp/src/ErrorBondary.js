// create the ErrorBoundary class component, it will hold an error property in the state. The error value is set to null.
// Use the componentDidCatch lifecycle to set the value of the error property.
// Render an error message with some details. (We will use this component to wrap the BuggyCounter component in our below simulations)
// Use this below code to show the Error

// <details style={{ whiteSpace: 'pre-wrap' }}>
//     {this.state.error && this.state.error.toString()}
//     <br />
//     {this.state.errorInfo.componentStack}
// </details>
// Boundary component in the App.js file to wrap the BuggyCounter component.
import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
// Usage in App.js
// import ErrorBoundary from './ErrorBoundary';
// import BuggyCounter from './BuggyCounter'; // Assuming BuggyCounter is in the same directory
//
// function App() {
//   return (
//     <div className="App">
//       <ErrorBoundary>
//         <BuggyCounter />
//       </ErrorBoundary>
//     </div>