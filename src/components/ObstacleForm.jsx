import React from "react";

// All props are controlled from parent
export default function ObstacleForm({
  pool, setPool,
  title, setTitle,
  traits, setTraits,
  moves, setMoves,
  failPool, setFailPool,
  failDesc, setFailDesc
}) {
  return (
    <form
      style={{
        background: "#f6f3eb",
        border: "1px solid #c9c4b4",
        borderRadius: ".75rem",
        padding: "1rem",
        maxWidth: 480,
        marginBottom: "2rem",
        flex: "0 0 350px"
      }}
      onSubmit={e => e.preventDefault()}
    >
      {/* Common header for Challenge Pool and Name */}
      <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
        Challenge
      </div>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <label style={{ margin: 0 }}>
          <span style={{ fontSize: "0.95em" }}>Pool</span><br />
          <input
            type="number"
            min="1"
            max="99"
            value={pool}
            onChange={e => {
              let val = e.target.value.replace(/[^0-9]/g, "");
              if (val.length > 2) val = val.slice(0, 2);
              setPool(val);
            }}
            style={{ width: "2.5em", textAlign: "center" }}
          />
        </label>
        <label style={{ flex: 1, margin: 0 }}>
          <span style={{ fontSize: "0.95em" }}>Name</span><br />
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Traits (one per line)<br />
          <textarea
            value={traits}
            onChange={e => setTraits(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Moves (one per line)<br />
          <textarea
            value={moves}
            onChange={e => setMoves(e.target.value)}
            rows={3}
            style={{ width: "100%" }}
          />
        </label>
      </div>
      {/* Common header for Fail State */}
      <div style={{ fontWeight: 700, marginBottom: "0.25rem" }}>
        Fail State
      </div>
      <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <label style={{ margin: 0 }}>
          <span style={{ fontSize: "0.95em" }}>Pool</span><br />
          <input
            type="number"
            min="1"
            max="99"
            value={failPool}
            onChange={e => {
              let val = e.target.value.replace(/[^0-9]/g, "");
              if (val.length > 2) val = val.slice(0, 2);
              setFailPool(val);
            }}
            style={{ width: "2.5em", textAlign: "center" }}
          />
        </label>
        <label style={{ flex: 1, margin: 0 }}>
          <span style={{ fontSize: "0.95em" }}>Fail State Description</span><br />
          <input
            type="text"
            value={failDesc}
            onChange={e => setFailDesc(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
      </div>
    </form>
  );
}
