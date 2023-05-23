import { render , screen , cleanup , fireEvent } from "@testing-library/react"
import { describe , it , expect, beforeEach , vi } from 'vitest'
import { getCurrentPath } from '../utils/getCurrentPath'
import Router from './Router'
import Route from './Route'

vi.mock( '../utils/getCurrentPath' , () => ({
    getCurrentPath: vi.fn()
}))

import About from "../pages/About"
import Home from "../pages/Home"


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

        getCurrentPath?.mockReturnValue("/about")

        const routes : Route[] = [
            {
                path: '/',
                Component: Home
            },
            {
                path: '/about',
                Component: About
            },
        ]

        render(<Router routes={routes}/>)

        screen.debug();
        
        expect(screen.getByRole("heading")).exist
        
    })

    it("Deberia navegar entre rutas al navegar entre links" , () => {
        
        getCurrentPath?.mockReturnValue("/")

        render(
            <Router>
                <Route path="/" Component={Home} />
                <Route path="/about" Component={About} />
            </Router>
        )

        fireEvent.click(screen.getByText("Ir a about"))

        expect(screen.findByText("About")).toBeTruthy()
        
        screen.debug()

    })

})