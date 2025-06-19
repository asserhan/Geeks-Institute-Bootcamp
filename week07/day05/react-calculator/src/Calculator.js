import React, { useState } from "react";

const Calculator = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    if (isNaN(a) || isNaN(b)) {
      setResult("Please enter valid numbers");
      return;
    }

    let res;
    switch (operation) {
      case "add":
        res = a + b;
        break;
      case "subtract":
        res = a - b;
        break;
      case "multiply":
        res = a * b;
        break;
      case "divide":
        res = b !== 0 ? a / b : "Cannot divide by zero";
        break;
      default:
        res = "Unknown operation";
    }
    setResult(res);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>React Calculator</h2>
      <input
        type="number"
        placeholder="First Number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <input
        type="number"
        placeholder="Second Number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        style={{ marginRight: "10px", padding: "5px" }}
      />
      <br /><br />
      <select value={operation} onChange={(e) => setOperation(e.target.value)} style={{ padding: "5px" }}>
        <option value="add">Add (+)</option>
        <option value="subtract">Subtract (-)</option>
        <option value="multiply">Multiply (×)</option>
        <option value="divide">Divide (÷)</option>
      </select>
      <br /><br />
      <button onClick={handleCalculate} style={{ padding: "5px 15px" }}>
        Calculate
      </button>
      <h3>Result: {result !== null ? result : "-"}</h3>
    </div>
  );
};

export default Calculator;
