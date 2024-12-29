import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { endpoints } from "../endpoints";
import { Task } from "@/models/tasks/task.interface";
import { useState } from "react";
import { TaskStatus } from "@/models/tasks/task-statuses.enum";

export default function useGetTasks() {
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(TaskStatus.ALL);

  const {
    data: tasks = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", taskStatus],
    queryFn: () => {
      let endpoint = endpoints.tasks.getAll;

      if (taskStatus !== TaskStatus.ALL) {
        endpoint = `${endpoints.tasks.getAll}?status=${taskStatus}`;
      }

      return fetcher<Task[]>({
        url: endpoint,
      });
    },
  });

  const filterByStatus = (status: TaskStatus) => {
    setTaskStatus(status);
  };

  return {
    tasks,
    isLoading,
    error,
    filterByStatus,
  };
}
