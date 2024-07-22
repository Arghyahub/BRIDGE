import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CommandList } from "cmdk";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface Props {
  title: string;
  datas: { name: string; disabled?: boolean }[];
  setState: React.Dispatch<React.SetStateAction<string>>;
  State: string;
}

export default function ComboboxDemo({ title, datas, setState, State }: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(State ? State : "");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="text-sm md:text-base">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-[140px] md:w-[150px] text-black"
        >
          {value ? datas.find((data) => data.name === value)?.name : title}
          <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[140px] md:w-[150px] max-h-60 text-black text-sm md:text-base overflow-y-auto">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="text-black">
            <CommandEmpty>{title}</CommandEmpty>
            <CommandGroup>
              {datas.map((data) => (
                <CommandItem
                  key={data.name}
                  value={data.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    setState(currentValue);
                  }}
                  disabled={data.disabled !== undefined ? data.disabled : false}
                  className="text-black cursor-pointer"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === data.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {data.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
