"use client";

import { TaskCard } from "../task-card/task-card";
import { useTasks } from "@/context/task-context";

interface TaskListProps {
  onEditTask: (task: any) => void;
}

export function TaskList({ onEditTask }: TaskListProps) {
  const { tasks, isLoading } = useTasks();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div
          className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"
          role="status"
          aria-label="Loading tasks"
        />
      </div>
    );
  }

  return (
    <div>
      {tasks.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500 text-lg">
            No tasks. Start by creating a new task
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => onEditTask(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
