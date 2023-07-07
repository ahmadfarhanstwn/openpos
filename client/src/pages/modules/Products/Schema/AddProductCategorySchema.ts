import { TypeOf, object, string } from "zod"

export const addProductCategorySchema = object({
    category_name: string().min(1, 'Category Name is required').max(255, 'Product Category must be less than 255 characters'),
})

export type AddProductCategoryInput = TypeOf<typeof addProductCategorySchema>