"use client";

import React, { useState } from "react";
import gitCommands from "./gitCommands.json";
import NavBar from "./components/nav";

function App() {
  const [language, setLanguage] = useState("fr");
  const [search, setSearch] = useState("");

  const normalizedSearch = search
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div>
      <div className="flex min-h-screen">
        <NavBar
          language={language}
          setLanguage={setLanguage}
          search={search}
          setSearch={setSearch}
          gitCommands={gitCommands}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="mx-auto ml-96 flex max-w-full flex-wrap items-start justify-around rounded-xl bg-white p-6 shadow-md">
          <h1 className="w-full text-center text-xl font-bold">
            Learn Git commands
          </h1>
          {Object.entries(gitCommands)
            .filter(
              ([category]) =>
                !selectedCategory || category === selectedCategory,
            )
            .map(([category, commands]) => (
              <div
                key={category}
                className="m-2 flex w-64 flex-col rounded bg-gray-200 p-4 shadow-lg"
              >
                <h2 className="mb-2 text-lg font-semibold">{category}</h2>
                {commands
                  .filter(
                    (cmd) =>
                      cmd.command.toLowerCase().includes(normalizedSearch) ||
                      cmd.description[language]
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .includes(normalizedSearch),
                  )
                  .map((cmd, index) => (
                    <div key={index}>
                      <h3 className="text-md font-semibold">{cmd.command}</h3>
                      <p className="text-gray-800">
                        {cmd.description[language]}
                      </p>
                    </div>
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
