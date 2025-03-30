import { SortableItem } from '@/components/task-input/SortableTaskInput';
import { Task, useTaskStore } from '@/stores/task.store';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';

function SortableTaskInputBox({
  tasks,
  items,
  setItems
}: {
  tasks: Task[],
  items: string[],
  setItems: React.Dispatch<React.SetStateAction<string[]>>
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {items.map((uuid) =>
          <
            SortableItem
            key={uuid}
            id={uuid}
            disabled
            value={tasks.find(t => t.uuid === uuid)?.name}
          />
        )}
      </SortableContext>
    </DndContext>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
}

export default function PrioritizingView() {
  const tasks = useTaskStore(s => s.tasks);
  const [items, setItems] = React.useState<string[]>(tasks.map(t => t.uuid));

  return <>
    <SortableTaskInputBox tasks={tasks} items={items} setItems={setItems} />
  </>
}