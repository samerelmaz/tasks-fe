import { useQuery } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { endpoints } from "../endpoints";
import { Task } from "@/models/tasks/task.interface";
import { useState } from "react";
import { TaskStatus } from "@/models/tasks/task-statuses.enum";
import { errorToast } from "@/utils/toast";

export default function useGetTasks() {
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(TaskStatus.ALL);

  const { data: tasks = [], isLoading } = useQuery({
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
    onError() {
      errorToast("An error occurred while fetching tasks");
    },
  });

  const filterByStatus = (status: TaskStatus) => {
    setTaskStatus(status);
  };

  return {
    tasks,
    isLoading,
    filterByStatus,
  };
}
