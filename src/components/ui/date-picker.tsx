import * as React from 'react'
import { IconCalendar } from '@tabler/icons-react'
import { format, parse } from 'date-fns'
import { Button } from './button'
import { Calendar } from './calendar'
import { Input } from './input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { cn } from '@/lib/utils'

function formatDate(date: Date | undefined) {
  if (!date) {
    return ''
  }

  return format(date, 'dd MMMM, yyyy')
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false
  }
  return !isNaN(date.getTime())
}

type DatePickerProps = {
  initialDate?: Date
  onDateChange: (date: Date | undefined) => void
  className?: string
  placeholder?: string
  id?: string
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void
} & Omit<
  React.ComponentProps<typeof Calendar>,
  'mode' | 'selected' | 'onSelect' | 'captionLayout' | 'month' | 'onMonthChange'
>

export function DatePicker({
  initialDate,
  onDateChange,
  placeholder,
  className,
  id,
  onBlur,
  ...props
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [calendarDate, setCalendarDate] = React.useState<Date | undefined>(
    initialDate,
  )
  const [month, setMonth] = React.useState<Date | undefined>(calendarDate)
  const [value, setValue] = React.useState(formatDate(calendarDate))
  const [error, setError] = React.useState(false)

  React.useEffect(() => {
    setCalendarDate(initialDate)
    setValue(formatDate(initialDate))
    setMonth(initialDate)
  }, [initialDate])

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const dateString = e.target.value
    if (dateString === '') {
      onDateChange(undefined)
      setCalendarDate(undefined)
      setError(false)
    } else {
      const parsedDate = parse(dateString, 'dd MMMM, yyyy', new Date())
      if (isValidDate(parsedDate)) {
        onDateChange(parsedDate)
        if (onBlur) onBlur(e)
        setCalendarDate(parsedDate)
        setMonth(parsedDate)
        setValue(formatDate(parsedDate))
        setError(false)
      } else {
        onDateChange(undefined)
        setError(true)
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
    if (error) {
      setError(false)
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    onDateChange(date)
    setCalendarDate(date)
    setValue(formatDate(date))
    setOpen(false)
    setError(false)
  }

  return (
    <>
      <div className="relative flex gap-2">
        <Input
          id={id}
          value={value}
          placeholder={placeholder || 'DD MMMM, YYYY'}
          className={cn(
            'bg-background pr-10',
            className,
            error && 'border-destructive focus-visible:ring-destructive',
          )}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setOpen(true)
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
            >
              <IconCalendar className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={calendarDate}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleDateSelect}
              {...props}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
