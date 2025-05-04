import { CollectionConfig } from "payload";

export const Tags: CollectionConfig = {
    slug: "tags",
    access: {
        read: () => true,
    },
    admin: {
        useAsTitle: "name",
    },
    fields: [
        {
            name: "name",
            type: "text",
            required: true
        },
        {
            name: "products",
            type: "relationship",
            relationTo: "products",
                hasMany: true,
        }
    ] 
}