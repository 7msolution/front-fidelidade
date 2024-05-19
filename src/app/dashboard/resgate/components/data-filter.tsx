"use client"
 
import * as React from "react"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon, Filter } from "lucide-react"
import { DateRange } from "react-day-picker"
 
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import TableResgate from "./table-resgate"



 
export function DataFilter({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  }
  )

  console.log(date?.from)
  return (

    <>
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 flex gap-3 align-middle"><span className="text-sm text-gray-700 h-9 items-center flex"><Filter></Filter></span>
    <div className="flex gap-3">
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      
    </div>
    <div><form>
        <input type="text" placeholder="Nome do cliente" className="h-9 bg-background border border-input px-4"></input>
        </form></div>
    <div>
                <Button>Buscar</Button>
    </div>
    </div>
    </div>

    <TableResgate></TableResgate>
    </>
  
  )
}