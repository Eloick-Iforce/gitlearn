"use client";

import React, { useState } from "react";
import gitCommands from "./gitCommands.json";

function App() {
  const [language, setLanguage] = useState("fr");
  const [search, setSearch] = useState("");

  return (
    <div className="mx-auto flex max-w-full flex-wrap items-start justify-around rounded-xl bg-white p-6 shadow-md">
      <h1 className="w-full text-center text-xl font-bold">
        Apprendre les commandes Git
      </h1>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="mb-4"
      >
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Rechercher une commande"
        className="mb-4 rounded border p-2"
      />
      {Object.entries(gitCommands).map(([category, commands]) => (
        <div
          key={category}
          className="m-2 flex w-64 flex-col rounded bg-gray-200 p-4 shadow-lg"
        >
          <h2 className="mb-2 text-lg font-semibold">{category}</h2>
          {commands
            .filter(
              (cmd) =>
                cmd.command.includes(search) ||
                cmd.description[language].includes(search),
            )
            .map((cmd, index) => (
              <div key={index}>
                <h3 className="text-md font-semibold">{cmd.command}</h3>
                <p className="text-gray-800">{cmd.description[language]}</p>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}

export default App;
