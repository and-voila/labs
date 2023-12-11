'use client';

import { useController } from 'react-hook-form';
import tzdata from 'tzdata';

import { cn } from '#/lib/utils';

import { Icons } from '#/components/shared/icons';
import { Button } from '#/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '#/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/ui/popover';

import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';

export interface TimezoneSelectProps {
  name: string;
  label?: string;
}

export const TimezoneSelect: React.FC<TimezoneSelectProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, label = 'Timezone', ...rest } = props;

  const control = useController({
    name,
  });
  const { field } = control;

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>

      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                'w-[200px] justify-between',
                !field.value && 'text-muted-foreground',
              )}
            >
              {field.value
                ? Object.keys(tzdata.zones).find((zone) => zone === field.value)
                : 'Select timezone'}
              <Icons.radixChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search Timezone..." />
            <CommandEmpty>No tiemzone found.</CommandEmpty>
            <CommandGroup>
              {Object.keys(tzdata.zones).map((zone) => (
                <CommandItem
                  value={zone}
                  key={zone}
                  onSelect={() => {
                    field.onChange(zone);
                  }}
                >
                  <Icons.radixCheck
                    className={cn(
                      'mr-2 h-4 w-4',
                      zone === field.value ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {zone}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <FormDescription>
        This is the timezone that will be used for all dates and times
      </FormDescription>
      <FormMessage />
    </FormItem>
  );
};
