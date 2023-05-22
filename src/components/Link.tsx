import { BUTTONS, NAVIGATION_EVENT } from "../utils/variables"
import { HTMLAttributeAnchorTarget, ReactNode } from "react"
import { HTMLProps } from 'react';

function navigate( href: string ){

    window.history.pushState( {} , '' , href )
  
    // CREAMOS UN EVENTO PERSONALIZADO 
  
    const navigationEvent = new Event(NAVIGATION_EVENT.PUSH_STATE)   
  
    window.dispatchEvent(navigationEvent)
  
}

type Props = HTMLProps<HTMLAnchorElement> & {
    target?: HTMLAttributeAnchorTarget
    children: ReactNode
    to: string
}

const Link = ( { target , to , children , ...rest }: Props ) => {
    
    const handleClick = ( event:React.MouseEvent<HTMLAnchorElement> ) => {
        
        const isMainEvent = event.button === BUTTONS.PRIMARY;

        // si alguna tecla esta modificando el evento
        
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey

        // SI EL TARGET A LA PAGINA NO VIENE O ES A LA MISMA

        const isManageableEvent = target === undefined || target === '_self'

        if( isManageableEvent && isMainEvent && !isModifiedEvent )
        {
            event.preventDefault()
            navigate(to)
        }


    }

  return (
    <a
        onClick={handleClick}
        target={target}
        href={to}
        {...rest}
    >
        { children }
    </a>
  )
}

export default Link