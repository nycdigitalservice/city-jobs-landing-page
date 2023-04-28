describe('Landing Page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/')
        cy.injectAxe({
            axeCorePath: 'node_modules/axe-core/axe.min.js'
        })
    })

    it('Has no detectable a11y violations on load', () => {
        cy.checkA11y()
    })
})
