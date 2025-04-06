import { DefaultCard } from '@/components/cards/DefaultCard';
import { SortableTaskInput } from '@/components/task-input/SortableTaskInput';
import { Button } from '@/components/ui/button';
import { ITaskModel } from '@/models/task.model';
import { useTaskStore } from '@/stores/task.store';
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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

function SortableTaskInputBox({
  tasks,
  items,
  setItems
}: {
  tasks: ITaskModel[],
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
    <div className="flex flex-col align-middle justify-center gap-2.5">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items}
          strategy={verticalListSortingStrategy}
        >
          {items.map((id) =>
            <
              SortableTaskInput
              value={tasks.find(t => t.id === id)?.name}
              id={id}
              key={id}
            />
          )}
        </SortableContext>
      </DndContext>
    </div>
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
  const { t } = useTranslation('prioritizing-view');
  const taskStore = useTaskStore();
  const [items, setItems] = React.useState<string[]>(taskStore.data.map(t => t.id));
  const navigate = useNavigate();

  return <>
    <DefaultCard title={t('title')} description={t('subtitle')}>
      <DefaultCard.Content>
        <SortableTaskInputBox tasks={taskStore.data} items={items} setItems={setItems} />
      </DefaultCard.Content>
      <DefaultCard.Footer>
        <div className="w-full flex flex-row align-middle justify-between">
          <Button
            variant='outline'
            onClick={back}
          >
            <span>Back</span>
          </Button>
          <Button
            variant='default'
            onClick={next}
          >
            <span>Next</span>
          </Button>
        </div>
      </DefaultCard.Footer>
    </DefaultCard>
  </>

  function back() {
    navigate('/listing');
  }

  function next() {
    items.forEach((id, index) => taskStore.update(id, { priority: index }))
    navigate('/pomodoro');
  }
}