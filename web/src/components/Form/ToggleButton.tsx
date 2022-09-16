import { useState } from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

const array = [
  { id: 1, value: '0', title: 'Domingo', content: 'D'},
  { id: 2, value: '1', title: 'Segunda', content: 'S'},
  { id: 3, value: '2', title: 'Terça', content: 'T'},
  { id: 4, value: '3', title: 'Quarta', content: 'Q'},
  { id: 5, value: '4', title: 'Quinta', content: 'Q'},
  { id: 6, value: '5', title: 'Sexta', content: 'S'},
  { id: 7, value: '6', title: 'Sábado', content: 'S'},
]

export function ToggleButton() {
  const [weekDays, setWeekDays] = useState<string[]>([])
  
  return (
    <ToggleGroup.Root
      type="multiple"
      className="grid grid-cols-4 gap-2"
      value={weekDays}
      onValueChange={setWeekDays}
      >
      {array.map((item) => {
        return (
          <ToggleGroup.Item
          key={item.id}
          value={item.value}
          title={item.title}
          className={`w-8 h-8 rounded ${weekDays.includes(item.value)  ? "bg-violet-600" : "bg-zinc-900"}`}
        >
          {item.content}
        </ToggleGroup.Item>
        )
      })}
    </ToggleGroup.Root>
  )
}