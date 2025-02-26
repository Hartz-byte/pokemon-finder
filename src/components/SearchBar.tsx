"use client";

import React, { ChangeEvent } from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

// SearchBarProps interface
interface SearchBarProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search Pokemon...",
}) => {
  return (
    <InputGroup mb={6}>
      <InputLeftElement
        pointerEvents="none"
        height="100%"
        display="flex"
        alignItems="center"
        pl={3}
      >
        <SearchIcon color="gray.400" />
      </InputLeftElement>

      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size="lg"
        borderRadius="lg"
        focusBorderColor="blue.500"
        pl={10}
      />
    </InputGroup>
  );
};

export default SearchBar;
