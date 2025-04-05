import { z } from "zod";
import { BaseModel } from "./base.model";

export const TaskModel = BaseModel.extend({
	name: z.string(),
	priority: z.number(),
})

export type ITaskModel = z.infer<typeof TaskModel>