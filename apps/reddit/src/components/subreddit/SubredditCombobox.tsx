"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@workspace/ui/components/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@workspace/ui/components/popover";
import { useState } from "react";
import {Check, ChevronsUpDown } from "lucide-react";
import { GetSubredditsQueryResult } from "@workspace/sanity-types/generated";
import { useRouter } from "next/navigation";

interface SubredditComboboxProps {
  subreddits: GetSubredditsQueryResult;
  defaultValue?: string;
}

export function SubredditCombobox({
  subreddits,
  defaultValue = "",
}: Readonly<SubredditComboboxProps>) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);

  // Handle selection of a subreddit
  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    setOpen(false);
    // Update the URL query parameter with slug
    if (currentValue) {
      // Find the subreddit and use its slug
      const selectedSubreddit = subreddits.find(
        (subreddit) => subreddit.title === currentValue
      );
      if (selectedSubreddit?.slug) {
        router.push(`/create-post?subreddit=${selectedSubreddit.slug}`);
      }
    } else {
      router.push(`/create-post`);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? subreddits.find((subreddit) => subreddit.title === value)
                ?.title || "Select a community"
            : "Select a community"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder="Search community..." />
          <CommandList>
            <CommandEmpty>No subreddit found.</CommandEmpty>
            <CommandGroup>
              {subreddits.map((subreddit) => (
                <CommandItem
                  key={subreddit._id}
                  value={subreddit.title ?? ""}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === subreddit.title ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {subreddit.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}