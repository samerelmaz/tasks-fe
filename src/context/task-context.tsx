"use client";

import React, { createContext, useContext, ReactNode } from "react";
import useGetTasks from "@/api/tasks/get-tasks";
import { Task } from "@/models/tasks/task.interface";
import useCreateTask from "@/api/tasks/create-task";
import { TaskStatus } from "@/models/tasks/task-statuses.enum";
import useDeleteTask from "@/api/tasks/delete-task";
import useUpdateTask from "@/api/tasks/update-task";

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  getTasks: (taskStatus: TaskStatus) => void;
  createTask: (
    task: Omit<Task, "id" | "createdAt" | "completed">
  ) => Promise<Task>;
  updateTask: (id: string, task: Partial<Task>) => Promise<Task>;
  deleteTask: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { tasks, filterByStatus: getTasks, isLoading } = useGetTasks();

  const { mutateAsync: createTask } = useCreateTask();

  const { mutateAsync: updateTask } = useUpdateTask();

  const { mutateAsync: deleteTask } = useDeleteTask();

  const contextValue: TaskContextType = {
    tasks,
    isLoading,
    getTasks: (taskStatus) => getTasks(taskStatus),
    createTask: (task) => createTask(task),
    updateTask: (id, task) => updateTask({ id, task }),
    deleteTask: (id) => deleteTask(id),
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
