import formatCost from '../utils/formatCost'

describe("calculateCostWithDiscount utility function", () => {
    test("should format a cost to have two digits after decimal", () => {
        expect(formatCost(15.75)).toBe('$15.75')
    })
})

describe("calculateCostWithDiscount utility function", () => {
    test("should format a number less than one to have no zeros before decimal", () => {
        expect(formatCost(.75)).toBe('$.75')
    })
})