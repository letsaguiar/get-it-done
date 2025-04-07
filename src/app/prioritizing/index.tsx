import { DefaultCard } from '@/components/cards/DefaultCard';
import { SortableTaskInput } from '@/components/task-input/SortableTaskInput';
import { Button } from '@/components/ui/button';
import { useActiveTasks } from '@/hooks/useActiveTasks';
import { ITaskModel } from '@/models/task.model';
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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

function SortableTaskInputBox({
  tasks,
  moveTask,
}: {
  tasks: ITaskModel[],
  moveTask: (oldIndex: number, newIndex: number) => void;
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
          items={tasks.map(t => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) =>
            <
              SortableTaskInput
              value={task.name}
              id={task.id}
              key={task.id}
            />
          )}
        </SortableContext>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    const oldIndex = tasks.findIndex(
      (task) => task.id === active.id
    );
    const newIndex = tasks.findIndex(
      (task) => task.id === over?.id
    );

    moveTask(oldIndex, newIndex);
  }
}

export default function PrioritizingView() {
  const { t } = useTranslation('prioritizing-view');
  const navigate = useNavigate();

  const {
    tasks,
    moveTask,
    updateTask,
  } = useActiveTasks();

  return <>
    <DefaultCard title={t('title')} description={t('subtitle')}>
      <DefaultCard.Content>
        <SortableTaskInputBox tasks={tasks} moveTask={moveTask} />
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
    tasks.forEach((task, index) => updateTask(task.id, { priority: index }));
    navigate('/pomodoro');
  }
}