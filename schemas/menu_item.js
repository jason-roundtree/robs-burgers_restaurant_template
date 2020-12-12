export default {
    title: 'Menu Item',
    name: 'menu_item',
    type: 'document',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string'
        },
        {
            title: 'Description',
            name: 'description',
            type: 'text'
        },
        {
            title: 'Cost',
            name: 'cost',
            type: 'number'
        },
        {
            title: 'Add-Ons',
            name: 'add_ons',
            type: 'array',
            of: [{
                type: 'reference',
                weak: true,
                to: [{type: 'add_on'}]
            }]
        },
        {
            title: 'One-Item Options',
            name: 'one_item_options',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            title: 'Menus',
            name: 'menus',
            type: 'array',
            of: [{
                type: 'reference',
                weak: true,
                to: [{type: 'menu'}]
            }]
        },
        {
            title: 'Thumbnail',
            name: 'thumbnail',
            type: 'image'
        },
        {
            title: 'Eliglble Menu Item of the Day',
            name: 'menu_item_of_day_eligible',
            type: 'boolean'
        },
        {
            title: 'Allergens',
            name: 'allergens',
            type: 'array',
            of: [{type: 'string'}]
        },
    ]
}