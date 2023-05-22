import { ComponentType } from "react"

type Props = {
    path: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component: ComponentType<any>
}

const Route = ( { path , Component }: Props ) => {
  return (
    <div>
        
    </div>
  )
}

export default Route