import { render , screen , cleanup } from "@testing-library/react"
import { describe , it , expect, beforeEach , vi } from 'vitest'
import { getCurrentPath } from '../utils/getCurrentPath'
import { Route } from './routes'
import Router from './Router'
import { lazy } from 'react'

vi.mock( '../utils/getCurrentPath' , () => ({
    getCurrentPath: vi.fn()
}))

const LazySearchPage = lazy( () => import("../pages/Search"))
const LazyAboutPage = lazy( () => import("../pages/About"))
const LazyHomePage = lazy( () => import("../pages/Home"))


describe("Test al router" , () => {

    beforeEach( () => {
        
        cleanup()

        vi.clearAllMocks()

    })

    it("Deberia renderizar sin errores", () => {
        
        render(<Router/>)

    }) 

    it("Deberia renderizar el 404" , () => {

        render(<Router/>)

        expect(screen.findByText("404")).toBeTruthy()

    })

    it("Deberia renderizar las rutas" , () => {

        // getCurrentPath.

        getCurrentPath.mockReturnValue("/about")

        // mock.mockImplementationOnce(() => '/')

        // mock()

        const routes : Route[] = [
            {
                path: '/',
                Component: LazyHomePage
            },
            {
                path: '/about',
                Component: LazyAboutPage
            },
            {
                path: '/search/:query',
                Component: LazySearchPage
            }
        ]

        render(<Router routes={routes}/>)

        screen.debug();

        expect(screen.findByText("404")).toBeTruthy()

    })

})