"use client";

import { useState } from "react";
import { TaskList } from "../components/tasks/task-list/task-list";
import { TaskForm } from "../components/tasks/task-form/task-form";
import { Plus } from "lucide-react";
import { TaskFilter } from "../components/tasks/task-card/task-filter/task-filter";
import { TaskProvider } from "@/context/task-context";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);

  return (
    <TaskProvider>
      <div className="max-w-[1920px] mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
            Task Manager
          </h1>
          <div className="flex justify-between items-center mb-8">
            <TaskFilter />
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-1" />
              New
            </button>
          </div>

          <TaskList
            onEditTask={(task) => {
              setEditingTask(task);
              setIsModalOpen(true);
            }}
          />
        </div>

        <TaskForm
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTask(null);
          }}
          task={editingTask}
        />
      </div>
    </TaskProvider>
  );
}
