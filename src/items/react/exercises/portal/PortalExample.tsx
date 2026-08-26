import { createPortal } from 'react-dom';

/**
 * Objetivo: renderizar un modal fuera del árbol DOM del padre.
 *
 * - Usa createPortal de react-dom
 * - El contenedor destino es #portal-root (ver index.html)
 * - El padre tiene overflow: hidden — prueba que el modal no quede recortado
 */
export function PortalExample() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className='text-2xl font-bold'>This text is placed in the root element.</h1>
      {
        createPortal(
          <p className='bg-red-500 text-white p-4'>This is a text form outside the root element (would be placed above the page between the tittle and the last text)</p>,
          document.getElementById('modal')!
        )
      }
      <p className='text-gray-500 text-sm dark:text-gray-400'>And this is the last text of the PortalExample component. The text outside the root element is below the page, do scroll to visualize it.</p>
    </div>
  )
}
