"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/atoms/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/atoms/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover";

const frameworks = [
  { value: "next.js", label: "Next.js" },
  { value: "sveltekit", label: "SvelteKit" },
  { value: "nuxt.js", label: "Nuxt.js" },
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
];

export function MultiSelect() {
  const [open, setOpen] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);

  const handleSelect = (value: string) => {
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const removeValue = (value: string) => {
    setSelectedValues((prev) => prev.filter((v) => v !== value));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          role="combobox"
          aria-expanded={open}
          className="justify-start flex gap-1 overflow-x-auto"
        >
          {selectedValues.length > 0 ? (
            <div className="flex gap-1">
              {selectedValues.map((val) => (
                <span
                  key={val}
                  className="bg-gray-200 px-2 py-0.5 rounded flex items-center gap-1 text-sm flex-shrink-0"
                >
                  {frameworks.find((f) => f.value === val)?.label}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeValue(val);
                    }}
                  />
                </span>
              ))}
            </div>
          ) : (
            "Select category..."
          )}
          <ChevronsUpDown className="ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search category..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => handleSelect(framework.value)}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValues.includes(framework.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
