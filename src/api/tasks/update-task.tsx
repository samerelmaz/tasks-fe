import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { endpoints } from "../endpoints";
import { Task } from "@/models/tasks/task.interface";
import { TaskStatus } from "@/models/tasks/task-statuses.enum";

export default function useUpdateTask() {
  const queryClient = useQueryClient();

  const { error, mutateAsync } = useMutation({
    mutationFn: async ({ id, task }: { id: string; task: Partial<Task> }) => {
      return fetcher<Task>({
        url: endpoints.tasks.update(id),
        options: {
          method: "PUT",
          body: JSON.stringify(task),
        },
      });
    },
    onSuccess: (updatedTask) => {
      // update cache to avoid unnecessary network requests
      const updaterFunction = (oldTasks: Task[] = []) =>
        oldTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t));

      queryClient.setQueryData(["tasks", TaskStatus.ALL], updaterFunction);
      queryClient.setQueryData(["tasks", TaskStatus.PENDING], updaterFunction);
      queryClient.setQueryData(
        ["tasks", TaskStatus.COMPLETED],
        updaterFunction
      );
    },
  });

  return {
    error,
    mutateAsync,
  };
}
