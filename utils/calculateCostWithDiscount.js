export default function calculateCostWithDiscount(
    item, isItemOfDay, itemOfDayDiscount
) {
    return isItemOfDay 
        ? item.cost - itemOfDayDiscount
        : item.cost
}