import React from "react";

export default function MonsterForm({
  name,
  setName,
  type,
  setType,
  colors,
  setColors,
  description,
  setDescription,
  traits,
  setTraits,
  moves,
  setMoves,
  wants,
  setWants,
  dislikes,
  setDislikes,
  flavorTitle,
  setFlavorTitle,
  flavorItems,
  setFlavorItems
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
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Monster Name and Type */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          <span style={{ fontSize: "0.95em" }}>Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
        <label style={{ marginTop: "0.5rem", display: "block" }}>
          <span style={{ fontSize: "0.95em" }}>Type</span>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
      </div>

      {/* Colors */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Colors (comma-separated)
          <input
            type="text"
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
      </div>

      {/* Description */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
      </div>

      {/* Traits */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Traits (one per line)
          <textarea
            value={traits}
            onChange={(e) => setTraits(e.target.value)}
            rows={3}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
      </div>

      {/* Moves */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Moves (one per line)
          <textarea
            value={moves}
            onChange={(e) => setMoves(e.target.value)}
            rows={3}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
      </div>

      {/* Wants and Dislikes */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Wants
          <input
            type="text"
            value={wants}
            onChange={(e) => setWants(e.target.value)}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
        <label style={{ marginTop: "0.5rem", display: "block" }}>
          Doesn't Want
          <input
            type="text"
            value={dislikes}
            onChange={(e) => setDislikes(e.target.value)}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
      </div>

      {/* Flavor Table */}
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Flavor Table Title
          <input
            type="text"
            value={flavorTitle}
            onChange={(e) => setFlavorTitle(e.target.value)}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
        <label style={{ marginTop: "0.5rem", display: "block" }}>
          Flavor Table Items (one per line)
          <textarea
            value={flavorItems}
            onChange={(e) => setFlavorItems(e.target.value)}
            rows={6}
            style={{ width: "100%", marginTop: "0.25rem" }}
          />
        </label>
      </div>
    </form>
  );
}
