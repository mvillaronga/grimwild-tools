import React from "react";
import "./MonsterDisplay.css";
import MovesBulletList from "./common/MovesBulletList";

// Replace the import with hardcoded data if the file doesn't exist
const diceFacesData = {
  diceFaces: [
    { image: "/images/dice_faces/dice_face_1.png" },
    { image: "/images/dice_faces/dice_face_2.png" },
    { image: "/images/dice_faces/dice_face_3.png" },
    { image: "/images/dice_faces/dice_face_4.png" },
    { image: "/images/dice_faces/dice_face_5.png" },
    { image: "/images/dice_faces/dice_face_6.png" },
  ],
};

const sensoryIcons = {
  sight: "/images/sensories/sight.png",
  sound: "/images/sensories/sound.png",
  smell: "/images/sensories/smell.png",
};

export default function MonsterDisplay() {
  const monsters = [
    {
      name: "Basilisk",
      type: "Lurker",
      colors: ["scaly-green", "mossy-brown", "rocky-gray"],
      description:
        "Spiny, eight-legged reptiles that lurk in forgotten, shadowy places. They patiently lay in wait to ambush prey, then feast on the petrified remains.",
      traits: ["Sluggish stealth", "Spiny hide", "Keen sense of smell"],
      moves: ["Petrifying Gaze", "Bite & Thrash", "Slink Away"],
      wants: "Wants to munch on a delicious statue, later.",
      dislikes: "Doesn't want light revealing its hiding places.",
      sensoryDetails: {
        sight: "gleam of scales, slithering trails through dust",
        sound: "silence, rasping hiss, crunching of chewed stone",
        smell: "chalky scent of ground stone, desiccated air",
      },
      flavorTable: {
        title: "Hiding Spots",
        items: [
          "Beneath a crumbling, but still-used bridge.",
          "Within the rotting carcass of a fallen dragon.",
          "On the fifth floor of a derelict watchtower.",
          "In a field full of half-eaten bear statues.",
          "Within a maze of rusted, echoing pipes.",
          "Among the twisted roots of a giant tree.",
        ],
      },
    },
    {
      name: "Behir",
      type: "Predator",
      colors: ["scaly-green", "stormy-gray", "azure-blue"],
      description:
        "Massive, solitary serpentine creatures with a dozen legs and brilliant azure scales. They live in dark, decaying places and rarely tolerate intruders.",
      traits: ["Cling to walls", "Serpentine flexibility", "Speech"],
      moves: ["Electric Breath", "Bite & Constrict", "Swallow Whole"],
      wants: "Wants to expand its hunting grounds, to savor its meal.",
      dislikes: "Doesn't want rival predators challenging its territory.",
      sensoryDetails: {
        sight: "deep claw marks, static sparks, lightning strike marks",
        sound: "sizzling electric snaps, sudden boom, shuffling legs",
        smell: "metallic tang, faint acrid smell, scorched hide",
      },
      flavorTable: {
        title: "Unearthed By",
        items: [
          "Landslide during a massive thunderstorm.",
          "Generational flood wiping out whole villages.",
          "Earthquake toppling castle walls.",
          "Collapse of a silver mine, forcing it to flee.",
          "Lich's minions dug too deep.",
          "Adventurers left an almost empty dungeon.",
        ],
      },
    },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "2rem",
        justifyContent: "center",
      }}
    >
      {monsters.map((monster, index) => (
        <article key={index} className="monster-block">
          <header className="monster-header">
            <span className="monster-name">{monster.name}</span>
            <span className="monster-role">{monster.type}</span>
          </header>
          <div className="color-bar">
            {monster.colors.map((color, i) => (
              <span
                key={i}
                className={`segment ${color}`}
                title={color.replace("-", " ")}
              ></span>
            ))}
          </div>
          <p className="description">{monster.description}</p>
          <section className="traits">
            <ul className="left">
              {monster.traits.map((trait, i) => (
                <li key={i}>{trait}</li>
              ))}
            </ul>
            <MovesBulletList moves={monster.moves} />
          </section>
          <p>
            <em>
              <strong>Wants</strong> {monster.wants}
            </em>
            <br />
            <em>
              <strong>Doesn't want</strong> {monster.dislikes}
            </em>
          </p>
          <ul className="sensory-clues" style={{ textAlign: "left", paddingLeft: "0" }}>
            <li style={{ listStyleType: "none", display: "flex", alignItems: "center" }}>
              <img
                src={sensoryIcons.sight}
                alt="Sight"
                className="sensory-icon"
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "8px",
                }} // Adjust size
              />
              <em>{monster.sensoryDetails.sight}</em>
            </li>
            <li style={{ listStyleType: "none", display: "flex", alignItems: "center" }}>
              <img
                src={sensoryIcons.sound}
                alt="Sound"
                className="sensory-icon"
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "8px",
                }} // Adjust size
              />
              <em>{monster.sensoryDetails.sound}</em>
            </li>
            <li style={{ listStyleType: "none", display: "flex", alignItems: "center" }}>
              <img
                src={sensoryIcons.smell}
                alt="Smell"
                className="sensory-icon"
                style={{
                  width: "16px",
                  height: "16px",
                  marginRight: "8px",
                }} // Adjust size
              />
              <em>{monster.sensoryDetails.smell}</em>
            </li>
          </ul>
          {monster.flavorTable && (
            <>
              <h3 className="section-title">{monster.flavorTable.title}</h3>
              <ul className="flavor-table">
                {monster.flavorTable.items.map((item, i) => (
                  <li key={i}>
                    <img
                      className="dice-face"
                      src={
                        diceFacesData.diceFaces[
                          i % diceFacesData.diceFaces.length
                        ].image
                      }
                      alt={`${i + 1}`}
                    />{" "}
                    {item}
                  </li>
                ))}
              </ul>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
