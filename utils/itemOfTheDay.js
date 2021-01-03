const dummyItemsOfTheDay = [
    {
        day: 'Sunday',
        id: 0,
        name: 'sun'
    },
    {   
        day: 'monday',
        id: 1,
        name: 'mon'
    },
    {
        day: 'tuesday',
        id: 2,
        name: 'tues'
    },
    {
        day: 'wednesday',
        id: 3,
        name: 'wed'
    },
    {
        day: 'thursday',
        id: 4,
        name: 'thurs'
    },
    {
        day: 'friday',
        id: 5,
        name: 'fri'
    },
    {
        day: 'saturday',
        id: 6,
        name: 'sat'
    }
]

const dayNum = new Date().getDay()

console.log('date: ', dummyItemsOfTheDay[dayNum])

