import calculateCostWithDiscount from '../utils/calculateCostWithDiscount'

describe("calculateCostWithDiscount utility function", () => {
    test("should calculate the cost of a discounted menu item after discount", () => {
        const itemDiscounted = {
            description: 'cheeseburger',
            cost: 11,
            discount: 2
        }
        expect(calculateCostWithDiscount(
            itemDiscounted,
            true,
            itemDiscounted.discount
        )).toEqual(9)
    })
})

describe('calculateCostWithDiscount utility function', () => {
    test('should calculate the cost of a non-discounted menu item', () => {
        const itemNotDiscounted = {
            description: 'bacon cheeseburger',
            cost: 13,
        }
        expect(calculateCostWithDiscount(
            itemNotDiscounted,
            false,
            null
        )).toEqual(13)
    })
})