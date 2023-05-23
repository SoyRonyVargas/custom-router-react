import { Children, ComponentType, ReactNode, useEffect, useState } from "react"
import { NAVIGATION_EVENT } from "../utils/variables"
import { match } from 'path-to-regexp'
import { Route } from "./routes"
import { getCurrentPath } from "../utils/getCurrentPath"

type ConfigRouter = {
  defaultComponent?: ComponentType
  children?: ReactNode
  routes?: Route[]
}

const DefaultComponent = () => <h1>404</h1>

const Router = ({ routes = [], children }: ConfigRouter) => {
  // Estado para almacenar la ruta actual
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    
    const onLocationChange = () => {
      
      // Actualizar la ruta actual cuando cambie la ubicación del navegador
      
      setCurrentPath(getCurrentPath())

    }

    // Escuchar eventos de cambio de ubicación
    window.addEventListener(NAVIGATION_EVENT.PUSH_STATE, onLocationChange)
    window.addEventListener(NAVIGATION_EVENT.POP_STATE, onLocationChange)

    // Limpiar el evento de escucha cuando el componente se desmonta
    return () => {
      window.removeEventListener(NAVIGATION_EVENT.PUSH_STATE, onLocationChange)
      window.removeEventListener(NAVIGATION_EVENT.POP_STATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // Agregar rutas proporcionadas mediante la prop "children"
  const routesFromChildren = Children.map(children, (child: any) => {
    const { props, type } = child
    const { name } = type

    const isRoute = name === 'Route'

    return isRoute ? props : null
  })?.filter(Boolean) as Route[]

  // Combinar las rutas proporcionadas en las props y las rutas de children
  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  // Encontrar la ruta coincidente para la ruta actual
  const Page =
    routesToUse.find(({ path }) => {
      if (path === currentPath) return true

      const matcherUrl = match(path, { decode: decodeURIComponent })
      const matched = matcherUrl(currentPath)

      if (!matched) return false

      routeParams = matched.params // { query: 'ReactJS' }

      return true
    })?.Component || DefaultComponent

  // Renderizar el componente correspondiente a la ruta actual
  return <Page routeParams={routeParams} />
}

export default Router