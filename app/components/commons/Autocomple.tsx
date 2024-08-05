// components/Autocomplete.tsx
import React, { useState } from "react";

type AutocompleteProps = {
  items: { id: number; description: string }[];
  onSelect: (item: { id: number; description: string }) => void;
};

const Autocomplete: React.FC<AutocompleteProps> = ({ items, onSelect }) => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState(items);

  const [openOptions, setOpenOptions] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    // Filtrar elementos según el valor del input
    const filtered = items.filter((item) =>
      item.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleSelect = (item: { id: number; description: string }) => {
    setQuery(item.description);
    // setFilteredItems([]);
    setOpenOptions(false);
    onSelect(item);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onClick={() => setOpenOptions(true)}
        className="w-full px-4 py-2 border border-gray-300 rounded"
        placeholder="Buscar proyecto..."
      />
      {openOptions && (
        <ul className="absolute w-full mt-1 bg-white border border-gray-300 rounded shadow-lg">
          {filteredItems.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
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
