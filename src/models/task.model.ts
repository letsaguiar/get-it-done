import { z } from "zod";
import { BaseModel } from "./base.model";

export const TaskModel = BaseModel.extend({
	name: z.string(),
	priority: z.number(),
	completed: z.boolean(),
	workedTimeSeconds: z.number().nonnegative()
})

export type ITaskModel = z.infer<typeof TaskModel>