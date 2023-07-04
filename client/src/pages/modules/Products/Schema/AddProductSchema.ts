import { TypeOf, number, object, string } from "zod"

export const addUpdateProductSchema = object({
    product_barcode: string().min(1, 'Product Barcode is required').max(25, 'Product Barcode must be less than 25 characters'),
    product_name: string().min(1, 'Product Name is required').max(25, 'Product Name must be less than 25 characters'),
    unit_id : number(),
    category_id: number(),
    product_price: number()
        .refine(value => typeof value === 'number' && value > 0, {
        message: 'Product Price must be a positive number',
        path: ['product_price'],
    }),
    discount_percentage: number().refine(value => typeof value === 'number' && value >= 0, {
        message: 'Discount must be a nonnegative number',
        path: ['discount_percentage'],
    }).refine(value => value <= 100, {
        message: 'Discount must be less than or equal to 100%',
        path: ['discount_percentage'],
    }),
})

export type AddUpdateProductInput = TypeOf<typeof addUpdateProductSchema>