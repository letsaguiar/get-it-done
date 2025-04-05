import { z } from "zod";

export const BaseModel = z.object({
	id: z.string().uuid(),
	createdAt: z.string().datetime(),
	updatedAt: z.string().datetime(),
})

export type IBaseModel = z.infer<typeof BaseModel>