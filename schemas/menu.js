export default {
    title: 'Menu',
      name: 'menu',
      type: 'document',
      fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string'
        },
        {
            title: 'MenuItems',
            name: 'menu_items',
            type: 'array',
            of: [{
                type: 'reference',
                weak: true,
                to: [{type: 'menu_item'}]
            }]
        },
        {
            title: 'MenuActive',
            name: 'menu_active',
            type: 'boolean'
        }
    ]
}