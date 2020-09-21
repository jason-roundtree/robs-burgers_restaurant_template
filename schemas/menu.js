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
        // {
        //     title: 'Comments',
        //     name: 'comments',
        //     type: 'array',
        //     of: [{ type: 'text' }]
        // },
        {
            title: 'Menu Items',
            name: 'menu_items',
            type: 'array',
            of: [{
                type: 'reference',
                weak: true,
                to: [{type: 'menu_item'}]
            }]
        },
        {
            title: 'Menu Order',
            name: 'menu_order',
            type: 'number'
        }
    ]
}