import { useState } from "react";

interface Command {
  command: string;
  description: { fr: string; en: string };
}

interface NavBarProps {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  gitCommands: Record<string, Command[]>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const NavBar = ({
  language,
  setLanguage,
  search,
  setSearch,
  gitCommands,
  setSelectedCategory,
}: NavBarProps) => {
  const [isNavMinimized, setIsNavMinimized] = useState(false);

  return (
    <div
      className={`fixed min-h-screen ${
        isNavMinimized ? "w-20" : "w-full sm:w-64 md:w-96"
      } bg-red-500 p-8`}
    >
      <button onClick={() => setIsNavMinimized(!isNavMinimized)}>
        {isNavMinimized ? "Expand" : "Minimize"}
      </button>
      {!isNavMinimized && (
        <>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="mb-4 bg-red-500 text-2xl text-white focus:outline-none"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une commande"
            className="mb-4 w-full rounded border bg-red-500 p-2 placeholder:text-gray-100"
          />
          <div className="flex flex-col items-start gap-8">
            {Object.keys(gitCommands).map((category) => (
              <button
                key={category}
                className="mb-2 text-2xl text-white"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
