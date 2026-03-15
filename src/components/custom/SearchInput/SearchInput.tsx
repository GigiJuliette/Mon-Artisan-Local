import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import type { SearchInputProps } from "./types";

export const SearchInput = ({ query, setQuery }: SearchInputProps) => {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};
