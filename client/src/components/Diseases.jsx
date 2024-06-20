import React from "react";

const Diseases = () => {
  return (
    <>
      <h1 className="text-bold text-center">Diseases</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "columnw", // Changed to "column"
          gap: "50px",
          paddingTop: "120px",
          paddingBottom: "120px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex", // Added flex display
            flexDirection: "column", // Changed to "row"
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Name 1</h2>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Symptoms 1</h2>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Disease 1</h2>
        </div>
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          <h2>Description </h2>
        </div>
        <div>
          <img src="/dog.jpg" alt="dog" style={{ width: "100%" }} />
        </div>
      </div>
    </>
  );
};

export default Diseases;
