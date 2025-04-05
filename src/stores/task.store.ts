import { createListStore } from './constructs/list.store';
import { ITaskModel, TaskModel } from '@/models/task.model';

export const useTaskStore = createListStore<ITaskModel>({
	name: 'tasks',
	schema: TaskModel,
	initialState: []
})