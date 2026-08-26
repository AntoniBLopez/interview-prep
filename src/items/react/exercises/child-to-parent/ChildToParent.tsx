import { useState } from 'react';

/**
 * Objetivo: pasar datos del hijo al padre.
 *
 * - El padre debe mostrar un mensaje recibido del hijo
 * - El hijo tiene un input y un botón para enviar
 * - Usa un callback en props (ej: onMessage)
 */

const ChildComponent = (props: { handleChildData: (childData: string) => void }) => {

  return (
    <div className='flex flex-col gap-2'>
      <h1 className='text-2xl font-bold'>Child component</h1>
      <div className='flex gap-2'>
        <input className='border-2 p-2' type="text" onChange={(e) => props.handleChildData(e.target.value)} />
      </div>
    </div>
  )
}


export function ChildToParent() {

  const [childData, setChildData] = useState('')

  const handleChildData = (childData: string) => {
    setChildData(childData)
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className='text-2xl font-bold'>Parent component</h1>
      <p className='text-gray-500 text-sm dark:text-gray-400'>This is the child data: {childData}</p>
      <div className='bg-gray-300 py-px w-full dark:bg-gray-700'/>
      {/* Implementa padre e hijo aquí */}
      <ChildComponent handleChildData={handleChildData} />
    </div>
  )
}
