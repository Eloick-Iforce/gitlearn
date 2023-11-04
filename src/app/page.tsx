"use client";

import React, { useState } from "react";
import gitCommands from "../../public/gitCommands.json";
import NavBar from "./components/nav";

interface Command {
  command: string;
  description: { fr: string; en: string };
}

function App() {
  const [language, setLanguage] = useState("en");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const normalizedSearch = search
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

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

        <div className="mx-auto ml-96 max-w-full p-6">
          <h1 className="mb-8 text-center text-xl font-bold">
            Learn Git commands
          </h1>
          {Object.entries(gitCommands)
            .filter(
              ([category]) =>
                !selectedCategory || category === selectedCategory,
            )
            .map(([category, commands]) => (
              <div key={category} className="mb-8">
                <h2 className="mb-4 text-lg font-semibold">{category}</h2>
                {commands
                  .filter(
                    (cmd) =>
                      cmd.command.toLowerCase().includes(normalizedSearch) ||
                      cmd.description[language as "fr" | "en"]
                        .normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .includes(normalizedSearch),
                  )
                  .map((cmd, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-md font-semibold">{cmd.command}</h3>
                      <p className="text-gray-800">
                        {cmd.description[language as "fr" | "en"]}
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
