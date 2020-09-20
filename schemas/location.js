export default {
    title: 'Location',
    name: 'about',
    type: 'document',
    fields: [
        {
            title: 'Name',
            name: 'name',
            type: 'string',
        },
        {
            title: 'Address',
            name: 'address',
            type: 'string',
        },
        {
            title: 'Contact Info',
            name: 'contact_info',
            type: 'array',
            of: [{
                weak: true,
                type: 'reference',
                to: [{type: 'contact'}]
            }]
        },
        {
            // TODO: can these names be the same as the model they refer to?
            title: 'Social Media',
            name: 'social_media',
            type: 'array',
            of: [{
                weak: true,
                type: 'reference',
                to: [{type: 'social_media'}]
            }]
        },
        {
            title: 'Menus',
            name: 'menus',
            type: 'array',
            of: [{
                weak: true,
                type: 'reference',
                to: [{type: 'menu'}]
            }]
        }
    ]
}