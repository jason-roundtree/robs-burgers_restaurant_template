export default {
    title: 'MenuItem',
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
            title: 'Options',
            name: 'options',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            title: 'Allergens',
            name: 'allergens',
            type: 'array',
            of: [{type: 'string'}]
        },
        {
            title: 'Thumbnail',
            name: 'thumbnail',
            type: 'image'
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
        }
    ]
}