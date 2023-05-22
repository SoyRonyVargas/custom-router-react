import { ComponentType } from "react"
import Home from "../pages/Home"
import About from "../pages/About"
import Search from "../pages/Search"

export type Route = {
    path: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ComponentType<any>
}

export const routes : Route[] = [
    {
        path: '/',
        Component: Home
    },
    // {
    //     path: '/about',
    //     Component: About
    // },
    {
        path: '/search/:query',
        Component: Search
    }
]