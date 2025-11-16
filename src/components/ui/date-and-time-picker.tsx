import { IconChevronDown } from "@tabler/icons-react";
import { format } from "date-fns";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Muted from "./typography/muted";

type DateAndTimePickerProps = {
  initialDateTime?: Date;
  onChange: (date: Date | undefined) => void;
  className?: string;
  placeholder?: string;
  id?: string;
  onBlur?: (date?: Date) => void;
} & Omit<
  React.ComponentProps<typeof Calendar>,
  "mode" | "selected" | "onSelect" | "captionLayout" | "month" | "onMonthChange"
>;

export function DateAndTimePicker({
  initialDateTime,
  onChange,
  placeholder,
  className,
  id,
  onBlur,
  ...props
}: DateAndTimePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(initialDateTime);
  const [time, setTime] = React.useState<string | null>(() => {
    return initialDateTime ? format(initialDateTime, "HH:mm") : null;
  });

  React.useEffect(() => {
    if (date && time) {
      const [hours, minutes] = time.split(":").map(Number);
      const newDateTime = new Date(date);
      newDateTime.setHours(hours);
      newDateTime.setMinutes(minutes);
      newDateTime.setSeconds(0);
      newDateTime.setMilliseconds(0);

      onChange(newDateTime);
      onBlur?.(newDateTime);
    }
  }, [date, time, onChange, onBlur]);

  return (
    <div
      className={cn("grid grid-cols-2 justify-center gap-2", className)}
      id={id}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={React.useId()}
            className="w-full justify-between font-normal"
          >
            {date ? date.toLocaleDateString() : <Muted>{placeholder}</Muted>}
            <IconChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              setDate(selectedDate);

              setOpen(false);
            }}
            {...props}
          />
        </PopoverContent>
      </Popover>
      <Input
        type="time"
        id={React.useId()}
        value={time || ""}
        onChange={(e) => setTime(e.target.value)}
        step="1"
        defaultValue={time || ""}
        className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      />
    </div>
  );
}
