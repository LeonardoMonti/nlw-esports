import { useState } from 'react'
import * as Select from '@radix-ui/react-select'

import { CaretDown, Check } from 'phosphor-react'

type GameValue = {
  id: string
  title: string
}

interface SelectInputProps {
  gameValue: GameValue[]
}

export function SelectInput({ gameValue }: SelectInputProps) {
  const [gamesInput, setGamesInput] = useState('')
  
  return (
    <Select.Root name="game" onValueChange={setGamesInput}>
          <Select.SelectTrigger
            id="game"
            aria-label="Game"
            className={`bg-zinc-900 py-3 px-4 rounded text-small flex justify-between ${
              gamesInput ? "text-white" : "text-zinc-500"
            }`}
          >
            <Select.SelectValue placeholder="Select a game" />
            <Select.SelectIcon>
              <CaretDown size={24} className="text-zinc-400" />
            </Select.SelectIcon>
          </Select.SelectTrigger>
          <Select.SelectPortal>
            <Select.SelectContent className="bg-zinc-900 rounded">
              <Select.SelectScrollUpButton>
                <CaretDown size={24} className="text-zinc-300" />
              </Select.SelectScrollUpButton>
              <Select.SelectViewport className="py-2 px-1">
                <Select.SelectGroup>
                  {gameValue.map((game) => {
                    return (
                      <Select.SelectItem
                        key={game.id}
                        className="flex items-center justify-between py-2 px-3 m-1 bg-zinc-900 text-zinc-500 cursor-pointer rounded hover:bg-zinc-800 hover:text-white"
                        value={game.id}
                      >
                        <Select.SelectItemText>
                          {game.title}
                        </Select.SelectItemText>
                        <Select.SelectItemIndicator>
                          <Check size={24} className="text-emerald-500" />
                        </Select.SelectItemIndicator>
                      </Select.SelectItem>
                    );
                  })}
                </Select.SelectGroup>
              </Select.SelectViewport>
            </Select.SelectContent>
          </Select.SelectPortal>
        </Select.Root>
  )
}