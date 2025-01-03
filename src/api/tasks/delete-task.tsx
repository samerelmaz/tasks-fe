import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetcher } from "../fetcher";
import { endpoints } from "../endpoints";
import { Task } from "@/models/tasks/task.interface";
import { TaskStatus } from "@/models/tasks/task-statuses.enum";
import { errorToast } from "@/utils/toast";

export default function useDeleteTask() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: async (deletedTaskId: string) => {
      await fetcher<void>({
        url: endpoints.tasks.delete(deletedTaskId),
        options: {
          method: "DELETE",
        },
      });

      return deletedTaskId;
    },
    onSuccess: (deletedId) => {
      // update cache to avoid unnecessary network requests
      const updaterFunction = (oldTasks: Task[] = []) =>
        oldTasks.filter((t) => t.id !== deletedId);
      queryClient.setQueryData(["tasks", TaskStatus.ALL], updaterFunction);
      queryClient.setQueryData(["tasks", TaskStatus.PENDING], updaterFunction);
      queryClient.setQueryData(
        ["tasks", TaskStatus.COMPLETED],
        updaterFunction
      );
    },
    onError() {
      errorToast("An error occurred while deleting the task");
    },
  });

  return {
    mutateAsync,
  };
}
