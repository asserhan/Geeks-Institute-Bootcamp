import React from "react";

function FormComponent({ data, handleChange, handleSubmit }) {
  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={data.firstName}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={data.lastName}
          onChange={handleChange}
        />
        <br />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={data.age}
          onChange={handleChange}
        />
        <br />
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={data.gender === "male"}
            onChange={handleChange}
          />
          Male
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={data.gender === "female"}
            onChange={handleChange}
          />
          Female
        </label>
        <br />
        <label>
          Destination:
          <select
            name="destination"
            value={data.destination}
            onChange={handleChange}
          >
            <option value="">-- Choose --</option>
            <option value="Japan">Japan</option>
            <option value="Brazil">Brazil</option>
            <option value="Norway">Norway</option>
          </select>
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="lactoseFree"
            checked={data.lactoseFree}
            onChange={handleChange}
          />
          Lactose Free?
        </label>
        <br />
        <button>Submit</button>
      </form>

      <hr />

      <h2>Entered information:</h2>
      <p>Your name: {data.firstName} {data.lastName}</p>
      <p>Your age: {data.age}</p>
      <p>Your gender: {data.gender}</p>
      <p>Your destination: {data.destination}</p>
      <p>
        Lactose Free: {data.lactoseFree ? "Yes" : "No"}
      </p>
    </main>
  );
}

export default FormComponent;
