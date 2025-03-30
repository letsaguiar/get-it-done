import { SortableTaskInput } from '@/components/task-input/SortableTaskInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

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
          {items.map((uuid) =>
            <
              SortableTaskInput
              value={tasks.find(t => t.uuid === uuid)?.name}
              id={uuid}
              key={uuid}
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
  const tasks = useTaskStore(s => s.tasks);
  const updateTask = useTaskStore(s => s.update);
  const [items, setItems] = React.useState<string[]>(tasks.map(t => t.uuid));
  const navigate = useNavigate();

  return <>
    <Card className="w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12">
      <CardHeader>
        <CardTitle>{t('title')}</CardTitle>
        <CardDescription>{t('subtitle')}</CardDescription>
      </CardHeader>
      <CardContent>
        <SortableTaskInputBox tasks={tasks} items={items} setItems={setItems} />
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-row align-middle justify-between">
          <
            Button
            variant='secondary'
            onClick={back}
          >
            <span>Back</span>
          </Button>
          <
            Button
            variant='outline'
            onClick={next}
          >
            <span>Next</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  </>

  function back() {
    navigate('/listing');
  }

  function next() {
    items.forEach((uuid, index) => updateTask(uuid, { priority: index }))
    navigate('/pomodoro');
  }
}