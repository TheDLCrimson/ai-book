import React from "react";

interface SelectMenuProps {
  label: string;
  options: string[];
  onChange: (value: string) => void;
}

export default function SelectMenu({
  label,
  options,
  onChange,
}: SelectMenuProps) {
  return (
    <div>
      <label
        htmlFor={label}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <select
        id={label}
        name={label}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={options[0]}
        className="mt-2 block w-full sm:w-48 mb-4 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
