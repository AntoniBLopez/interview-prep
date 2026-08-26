import { useState, type ReactNode } from 'react'

type HiddenAnswerProps = {
  children: ReactNode
}

export function HiddenAnswer({ children }: HiddenAnswerProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className="w-fit rounded-md border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        onClick={() => setVisible((value) => !value)}
      >
        {visible ? 'Ocultar respuesta' : 'Mostrar respuesta'}
      </button>
      {visible ? <div className="flex flex-col gap-2">{children}</div> : null}
    </div>
  )
}
