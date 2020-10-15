export default function formatCost(value) {
    return `$${
        (Math.round(value * 100) / 100)
            .toFixed(2)
            .toString()
            // removes leading zero from items less than $1
            .replace(/^0+/, '')
    }`
}