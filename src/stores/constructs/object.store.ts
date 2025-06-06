import { IBaseModel } from "@/models/base.model";
import { z } from "zod";
import { create, StoreApi } from "zustand";

type State<T> = {
  data: T
}

type Actions<T> = {
  save: (model: T) => void;
  update: (updates: Partial<T>) => void;
}

export function createObjectStore<
  Model extends IBaseModel,
  Extensions extends object = {}
>({
  name,
  schema,
  initialState,
  extensions,
}: {
  name: string,
  schema: z.ZodType<Model>,
  initialState: Model
  extensions?: (
    set: (partial: Partial<State<Model> & Actions<Model> & Extensions>, replace?: false) => void,
    get: () => State<Model> & Actions<Model> & Extensions,
    api: StoreApi<State<Model> & Actions<Model> & Extensions>
  ) => Extensions
}) {
  const persist = (data: Model) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  const load = (): Model => {
    try {
      const raw = localStorage.getItem(name);
      const parsed = JSON.parse(raw || 'null');
      return schema.parse(parsed);
    } catch(e) {
      persist(initialState);
      return initialState;
    }
  };

  const baseStateAndActions = (set: any, get: any): State<Model> & Actions<Model> => ({
    data: load(),
    save(model) {
      set({ data: model });
      persist(model);
    },
    update(updates) {
      const model = { ...get().data, ...updates };
      set({ data: model });
      persist(model);
    },
  });

  return create<State<Model> & Actions<Model> & Extensions>((set, get, api) => {
    const base = baseStateAndActions(set, get);
    const extended = extensions?.(set, get as any, api as any) ?? {};

    return {
      ...base,
      ...extended,
    } as State<Model> & Actions<Model> & Extensions;
  });
}