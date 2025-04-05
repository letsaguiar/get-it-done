import { IBaseModel } from "@/models/base.model";
import { z } from "zod";
import { create, StoreApi } from "zustand";

type State<T> = {
  data: T[];
};

type Actions<T> = {
  add: (item: T) => void;
  update: (id: string, updates: Partial<T>) => void;
  remove: (id: string) => void;
  find: () => T[];
  findOne: (id: string) => T;
};

export function createListStore<
  Model extends IBaseModel,
  Extensions extends object = {}
>({
  name,
  schema,
  initialState,
  extensions,
}: {
  name: string;
  schema: z.ZodType<Model>;
  initialState: Model[];
  extensions?: (
    set: (partial: Partial<State<Model> & Actions<Model> & Extensions>, replace?: false) => void,
    get: () => State<Model> & Actions<Model> & Extensions,
    api: StoreApi<State<Model> & Actions<Model> & Extensions>
  ) => Extensions
}) {
  const persist = (data: Model[]) => {
    localStorage.setItem(name, JSON.stringify(data));
  };

  const load = (): Model[] => {
    try {
      const raw = localStorage.getItem(name);
      const parsed = JSON.parse(raw || 'null');
      return (z.array(schema).parse(parsed));
    } catch {
      persist(initialState);
      return initialState;
    }
  };

  const baseStateAndActions = (set: any, get: any): State<Model> & Actions<Model> => ({
    data: load(),

    add(item) {
      const updated = [...get().data, item];
      set({ data: updated });
      persist(updated);
    },

    update(id, updates) {
      const updated = get().data.map((item: Model) =>
        item.id === id ? { ...item, ...updates } : item
      );
      set({ data: updated });
      persist(updated);
    },

    remove(id) {
      const updated = get().data.filter((item: Model) => item.id !== id);
      set({ data: updated });
      persist(updated);
    },

    find() {
      return get().data;
    },

    findOne(id) {
      return get().data.filter((item: Model) => item.id === id);
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