import React, { useState, useRef, useEffect } from "react";
import { RootState } from "@/app/theme/store";
import { useSelector } from "react-redux";

type AutocompleteProps = {
  items: { id: number; description: string }[];
  onSelect: (item: { id: number; description: string }) => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({ items, onSelect }) => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);
  const [openOptions, setOpenOptions] = useState(false);
  const isDarkMode = useSelector((state: RootState) => state.theme.isDarkMode);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Filtrar elementos según el valor del input
    const filtered = items.filter((item) =>
      item.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
    setOpenOptions(true);
  };

  const handleSelect = (item: { id: number; description: string }) => {
    setQuery(item.description);
    setOpenOptions(false);
    onSelect(item);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
      setOpenOptions(false);
    }
  };

  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpenOptions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  return (
    <div className="relative" ref={autocompleteRef}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border border-gray-300 rounded"
        style={
          isDarkMode
            ? { backgroundColor: "#1F2937", color: "white" }
            : { backgroundColor: "#F3F4F6" }
        }
        placeholder="Buscar proyecto..."
      />
      {openOptions && (
        <ul
          className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg"
          style={{ zIndex: 1000 }}
        >
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              style={
                isDarkMode
                  ? { backgroundColor: "#1F2937", color: "white" }
                  : { backgroundColor: "#F3F4F6" }
              }
              onClick={() => handleSelect(item)}
            >
              {item.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
