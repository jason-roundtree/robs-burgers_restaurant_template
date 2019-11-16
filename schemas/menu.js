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
            title: 'Active',
            name: 'active',
            type: 'boolean'
        },
        {
            title: 'Comments',
            name: 'comments',
            type: 'array',
            of: [{ type: 'text' }]
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
    ]
}