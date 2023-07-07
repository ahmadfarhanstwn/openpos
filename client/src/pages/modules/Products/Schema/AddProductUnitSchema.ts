import { TypeOf, object, string } from "zod"

export const addProductUnitSchema = object({
    unit_name: string().min(1, 'Unit Name is required').max(255, 'Product Unit must be less than 255 characters'),
})

export type AddProductUnitInput = TypeOf<typeof addProductUnitSchema>