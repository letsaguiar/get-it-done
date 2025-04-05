import { z } from "zod";
import { create, StoreApi } from "zustand";

type State<T> = {
  data: T
}

type Actions<T> = {
  save: (model: T) => void;
  update: (updates: Partial<T>) => void;
}

export function createObjectStore<T, Extensions extends object = {}>({
  name,
  schema,
  initialState,
  extensions,
}: {
  name: string,
  schema: z.ZodType<T>,
  initialState: T
  extensions?: (
    set: (partial: Partial<State<T> & Actions<T> & Extensions>, replace?: false) => void,
    get: () => State<T> & Actions<T> & Extensions,
    api: StoreApi<State<T> & Actions<T> & Extensions>
  ) => Extensions
}) {
  const persist = (data: Partial<T>) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  const load = (): T => {
    try {
      const raw = localStorage.getItem(name);
      const parsed = JSON.parse(raw || '{}');
      return schema.parse(parsed);
    } catch(e) {
      persist(initialState);
      return initialState;
    }
  };

  const baseStateAndActions = (set: any, get: any): State<T> & Actions<T> => ({
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

  return create<State<T> & Actions<T> & Extensions>((set, get, api) => {
    const base = baseStateAndActions(set, get);
    const extended = extensions?.(set, get as any, api as any) ?? {};

    return {
      ...base,
      ...extended,
    } as State<T> & Actions<T> & Extensions;
  });
}