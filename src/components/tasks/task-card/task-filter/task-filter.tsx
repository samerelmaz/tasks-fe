"use client";

import { useState } from "react";
import { Select } from "@/components/common/select";
import { useTasks } from "@/context/task-context";
import { TaskStatus } from "@/models/tasks/task-statuses.enum";

export function TaskFilter() {
  const [statusFilter, setStatusFilter] = useState("all");
  const { getTasks } = useTasks();

  const handleStatusChange = async (value: string) => {
    setStatusFilter(value);
    try {
      getTasks(value as TaskStatus);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  };

  const statusOptions = [
    { value: TaskStatus.ALL, label: "All Tasks" },
    { value: TaskStatus.COMPLETED, label: "Completed" },
    { value: TaskStatus.PENDING, label: "Pending" },
  ];

  return (
    <div className="w-48">
      <Select
        options={statusOptions}
        value={statusFilter}
        onChange={handleStatusChange}
        placeholder="Filter by status"
      />
    </div>
  );
}
