import { describe , it , expect } from 'vitest'
import { render , screen } from "@testing-library/react"
import Router from './Router'
describe("Test al router" , () => {

    it("Deberia funcionar", () => {
        
        render(<Router/>)

        expect(1).toEqual(1)

    }) 

})