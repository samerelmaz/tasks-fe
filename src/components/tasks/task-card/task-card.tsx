"use client";

import { Edit2, Trash2 } from "lucide-react";
import { useTasks } from "@/context/task-context";
import dayjs from "dayjs";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

interface TaskCardProps {
  task: Task;
  onEdit: () => void;
}

export function TaskCard({ task, onEdit }: TaskCardProps) {
  const { deleteTask, updateTask } = useTasks();

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col h-full border border-gray-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-gray-900 line-clamp-2 align-top leading-none">
          {task.title}
        </h3>
        <div className="flex space-x-2 ml-2 flex-shrink-0">
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Edit task"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => task.id && deleteTask(task.id)}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete task"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-gray-600 text-sm mb-2 line-clamp-3">
          {task.description}
        </p>
      )}
      <div className="mt-auto">
        <p className="text-gray-400 text-xs mb-1">
          Created at: {dayjs(task.createdAt).format("DD/MM/YYYY")}
        </p>
        <button
          onClick={() =>
            task.id && updateTask(task.id, { completed: !task.completed })
          }
          className={`w-full px-3 py-1 text-sm rounded-md transition-colors ${
            task.completed
              ? "bg-green-100 text-green-800 hover:bg-green-200"
              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
          }`}
        >
          Mark as {task.completed ? "pending" : "complete"}
        </button>
      </div>
    </div>
  );
}
