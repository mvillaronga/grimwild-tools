import React from "react";
import "./MonsterDisplay.css";

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
      sensoryDetails: [
        "gleam of scales, slithering trails through dust",
        "silence, rasping hiss, crunching of chewed stone",
        "chalky scent of ground stone, desiccated air",
      ],
      hidingSpots: [
        "Beneath a crumbling, but still-used bridge.",
        "Within the rotting carcass of a fallen dragon.",
        "On the fifth floor of a derelict watchtower.",
        "In a field full of half-eaten bear statues.",
        "Within a maze of rusted, echoing pipes.",
        "Among the twisted roots of a giant tree.",
      ],
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
      sensoryDetails: [
        "deep claw marks, static sparks, lightning strike marks",
        "sizzling electric snaps, sudden boom, shuffling legs",
        "metallic tang, faint acrid smell, scorched hide",
      ],
      unearthedBy: [
        "Landslide during a massive thunderstorm.",
        "Generational flood wiping out whole villages.",
        "Earthquake toppling castle walls.",
        "Collapse of a silver mine, forcing it to flee.",
        "Lich's minions dug too deep.",
        "Adventurers left an almost empty dungeon.",
      ],
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
            <ul className="right">
              {monster.moves.map((move, i) => (
                <li key={i}>
                  <strong>{move}</strong>
                </li>
              ))}
            </ul>
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
          <ul className="sensory-clues">
            {monster.sensoryDetails.map((detail, i) => (
              <li key={i}>{detail}</li>
            ))}
          </ul>
          {monster.hidingSpots && (
            <>
              <h3 className="section-title">Hiding Spots</h3>
              <ul className="hiding-spots">
                {monster.hidingSpots.map((spot, i) => (
                  <li key={i}>{spot}</li>
                ))}
              </ul>
            </>
          )}
          {monster.unearthedBy && (
            <>
              <h3 className="section-title">Unearthed By</h3>
              <ul className="hiding-spots">
                {monster.unearthedBy.map((event, i) => (
                  <li key={i}>{event}</li>
                ))}
              </ul>
            </>
          )}
        </article>
      ))}
    </div>
  );
}
