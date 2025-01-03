import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { endpoints } from "../endpoints";
import { Task } from "@/models/tasks/task.interface";
import { TaskStatus } from "@/models/tasks/task-statuses.enum";
import { errorToast } from "@/utils/toast";

export default function useCreateTask() {
  const endpoint = endpoints.tasks.create;
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (
      newTask: Omit<Task, "id" | "createdAt" | "completed">
    ) => {
      return fetcher<Task>({
        url: endpoint,
        options: {
          body: JSON.stringify(newTask),
          method: "POST",
        },
      });
    },
    onSuccess: (newTask) => {
      // update cache to avoid unnecessary network requests
      const updaterFunction = (oldTasks: Task[] = []) => [...oldTasks, newTask];
      queryClient.setQueryData(["tasks", TaskStatus.ALL], updaterFunction);
      queryClient.setQueryData(["tasks", TaskStatus.PENDING], updaterFunction);
    },
    onError() {
      errorToast("An error occurred while creating the task");
    },
  });

  return {
    mutateAsync,
  };
}
