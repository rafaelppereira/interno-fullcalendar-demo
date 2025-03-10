/* eslint-disable @typescript-eslint/no-explicit-any */
import DayGridPlugin from '@fullcalendar/daygrid'
import InteractionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import TimeGridPlugin from '@fullcalendar/timegrid'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import colors from 'tailwindcss/colors'

import { Button } from '../components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover'
import { Separator } from '../components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'

export function Home() {
  const calendarRef = useRef<FullCalendar>(null)
  const [calendarViewType, setCalendarViewType] = useState('week')

  const [events, setEvents] = useState([
    {
      patient: {
        name: 'Fabiana Mattos',
      },
      doctor: {
        name: 'Dr. Lessandro',
      },
      start: '2025-02-24T08:00:00',
      end: '2025-02-24T09:00:00',
      color: colors.red[400],
    },
    {
      patient: {
        name: 'Marlene',
      },
      doctor: {
        name: 'Dr. Lessandro',
      },
      start: '2025-02-25T07:00:00',
      end: '2025-02-25T09:30:00',
      color: colors.emerald[500],
    },
    {
      patient: {
        name: 'Gustavo Pereira',
      },
      doctor: {
        name: 'Dr. Lessandro',
      },
      start: '2025-02-26T08:00:00',
      end: '2025-02-26T09:30:00',
      color: colors.emerald[500],
    },
    {
      patient: {
        name: 'Carla',
      },
      doctor: {
        name: 'Dr. Lessandro',
      },
      start: '2025-02-26T09:30:00',
      end: '2025-02-26T10:30:00',
      color: colors.amber[500],
    },
    {
      patient: {
        name: 'Lara Fonseca',
      },
      doctor: {
        name: 'Dr. Lessandro',
      },
      start: '2025-02-27T07:00:00',
      end: '2025-02-27T11:30:00',
      color: colors.amber[500],
    },
    {
      patient: {
        name: 'Josiane Mara Franco',
      },
      doctor: {
        name: 'Dr. Lessandro',
      },
      start: '2025-02-28T08:00:00',
      end: '2025-02-28T16:00:00',
      color: colors.emerald[500],
    },
  ])

  const handleSelect = (info: any) => {
    const newTempEvent: any = {
      patient: { name: 'Novo Agendamento' },
      doctor: { name: 'Selecionado' },
      start: info.startStr,
      end: info.endStr,
      color: colors.blue[400],
    }

    setEvents([...events, newTempEvent])
  }

  const handleNext = () => {
    calendarRef.current?.getApi().next()
  }

  const handlePrev = () => {
    calendarRef.current?.getApi().prev()
  }

  const handleToday = () => {
    calendarRef.current?.getApi().today()
  }

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current
        .getApi()
        .changeView(calendarViewType === 'week' ? 'timeGridWeek' : 'dayGridDay')
    }
  }, [calendarViewType])

  return (
    <main className="max-h-screen min-h-screen w-full bg-zinc-100">
      <div className="mb-4 flex border-b-2 bg-white">
        <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-8">
          <img src="/logo.svg" alt="Conecta Clínica" />

          <div className="flex items-center gap-2">
            <Button onClick={handlePrev} size="icon" variant="outline">
              <ChevronLeft className="size-5" />
            </Button>

            <Button onClick={handleNext} size="icon" variant="outline">
              <ChevronRight className="size-5" />
            </Button>

            <Button onClick={handleToday} variant="outline">
              Hoje
            </Button>

            <Tabs defaultValue={calendarViewType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="week"
                  onClick={() => setCalendarViewType('week')}
                >
                  Semana
                </TabsTrigger>
                <TabsTrigger
                  disabled
                  value="day"
                  onClick={() => setCalendarViewType('day')}
                >
                  Dia
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="mx-auto h-full w-full max-w-[1440px] overflow-y-auto px-8">
        <div className="h-full w-full overflow-hidden rounded-xl border-2 bg-white">
          <FullCalendar
            events={events}
            ref={calendarRef}
            select={handleSelect}
            eventContent={(eventInfo) => {
              const { patient, doctor } = eventInfo.event.extendedProps

              return (
                <Popover>
                  <PopoverTrigger className="flex h-full w-full items-start justify-start">
                    <div className="w-full px-2 text-left">
                      <h2 className="text-md truncate font-semibold">
                        {patient.name} -{' '}
                        <span className="text-sm font-medium">
                          {doctor.name}
                        </span>
                      </h2>

                      <span className="font-semibold">
                        {eventInfo.timeText}
                      </span>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent
                    side="right"
                    align="center"
                    className="w-auto rounded-2xl"
                  >
                    <div className="flex items-start gap-2">
                      <div
                        className="relative top-[0.45rem] size-4 shrink-0 rounded-md"
                        style={{ backgroundColor: eventInfo.backgroundColor }}
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-zinc-600">
                          {patient.name}
                        </h2>
                        <p className="max-w-xs text-sm">
                          {patient.name.split(' ')[0]} está com esse agendamento
                          para realizar uma limpeza dental.
                        </p>

                        <Separator className="my-4" />
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              )
            }}
            plugins={[DayGridPlugin, TimeGridPlugin, InteractionPlugin]}
            initialView={
              calendarViewType === 'week' ? 'timeGridWeek' : 'dayGridDay'
            }
            nowIndicator
            allDaySlot={false}
            headerToolbar={false}
            editable={true}
            selectable={true}
            locale="pt-br"
            buttonText={{
              today: 'Hoje',
              month: 'Mês',
              week: 'Semana',
              day: 'Dia',
              list: 'Lista',
            }}
            slotMinTime="07:00:00"
            slotMaxTime="19:00:00"
            slotDuration="00:30:00"
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              omitZeroMinute: true,
              meridiem: false,
            }}
            dayHeaderClassNames={(date) => {
              if (date.isToday) {
                return ['today-day']
              }
              return []
            }}
            slotLabelContent={(args) => `${args.text.replace(':00', '')}H`}
            dayHeaderContent={(args) => {
              const dayNames: any = {
                'segunda-feira': 'Seg',
                'terça-feira': 'Ter',
                'quarta-feira': 'Qua',
                'quinta-feira': 'Qui',
                'sexta-feira': 'Sex',
                sábado: 'Sáb',
              }

              const dayName =
                dayNames[
                  args.date.toLocaleDateString('pt-BR', { weekday: 'long' })
                ] || ''

              const dayNumber = args.date.getDate()
              return `${dayName} ${dayNumber}`
            }}
            hiddenDays={[0]}
          />
        </div>
      </div>
    </main>
  )
}
