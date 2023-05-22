import { ComponentType, lazy } from "react"

const LazyHomePage = lazy( () => import("../pages/Home"))
const LazySearchPage = lazy( () => import("../pages/Search"))

export type Route = {
    path: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Component?: ComponentType<any>
}

export const routes : Route[] = [
    {
        path: '/',
        Component: LazyHomePage
    },
    // {
    //     path: '/about',
    //     Component: About
    // },
    {
        path: '/search/:query',
        Component: LazySearchPage
    }
]