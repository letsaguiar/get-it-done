import { z } from "zod";
import { BaseModel } from "./base.model";
import { v4 } from "uuid";

export const TaskModel = BaseModel.extend({
	name: z.string(),
	priority: z.number(),
	completed: z.boolean(),
	workedTimeSeconds: z.number().nonnegative()
})

export type ITaskModel = z.infer<typeof TaskModel>

export function createTaskModel(model: Partial<ITaskModel>): ITaskModel {
	return ({
		id: model.id ?? v4(),
		name: model.name ?? "",
		priority: model.priority ?? 0,
		completed: model.completed ?? false,
		workedTimeSeconds: model.workedTimeSeconds ?? 0,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	})
}