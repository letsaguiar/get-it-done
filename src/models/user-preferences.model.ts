import { z } from "zod";
import { BaseModel } from "./base.model";

export const UserPreferencesModel = BaseModel.extend({
	colorMode: z.enum(['light', 'dark'])
});

export type IUserPreferencesModel = z.infer<typeof UserPreferencesModel>