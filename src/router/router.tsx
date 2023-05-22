import { Children, ComponentType, ReactNode, useEffect, useState } from "react"
import { NAVIGATION_EVENT } from "../utils/variables"
import { match } from 'path-to-regexp'
import { Route } from "./routes"

type ConfigRouter = {
  defaultComponent?:ComponentType
  children?: ReactNode
  routes: Route[]
}

const DefaultComponent = () => <h1>404</h1>

const Router = ( { routes = [] , children } :ConfigRouter ) => {

    const [ currentPath , setCurrentPath ] = useState(window.location.pathname)

    useEffect( () => {
  
      const onLocationChange = () => {
  
        setCurrentPath(window.location.pathname)
        
      }
  
      window.addEventListener(NAVIGATION_EVENT.PUSH_STATE , onLocationChange)
      
      window.addEventListener(NAVIGATION_EVENT.POP_STATE , onLocationChange)
      
      return () => {
        window.removeEventListener(NAVIGATION_EVENT.PUSH_STATE , onLocationChange)
        window.removeEventListener(NAVIGATION_EVENT.POP_STATE , onLocationChange)
      }
      
    }, [])

    let routeParams = {}

    // AGREGAR RUTAS POR LA PROP CHILDREN

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const routesFromChildren = Children.map( children, ( child:any ) => {

      const { props, type } = child;

      const { name } = type;

      const isRoute = name === 'Route'

      return isRoute ? props : null;
      
    })?.filter(Boolean) as Route[]

    const routesToUse = routes.concat(routesFromChildren) 

    const Page = routesToUse.find( ({ path }) => {

      if( path === currentPath ) return true;

      const matcherUrl = match( path , { decode: decodeURIComponent })

      const matched = matcherUrl(currentPath)

      if( !matched ) return false;

      routeParams = matched.params // { query: 'ReactJS' }

      return true;

    })?.Component || DefaultComponent

    return <Page routeParams={routeParams} />;

}

export default Router