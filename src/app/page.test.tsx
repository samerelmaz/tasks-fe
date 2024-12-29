import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./page";
import { TaskProvider } from "@/context/task-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

jest.mock("../components/tasks/task-list/task-list", () => ({
  TaskList: () => <div data-testid="task-list">Task List</div>,
}));

jest.mock("../components/tasks/task-form/task-form", () => ({
  TaskForm: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
    <div data-testid="task-form">
      {isOpen && (
        <>
          <span>Task Form</span>
          <button onClick={onClose}>Close</button>
        </>
      )}
    </div>
  ),
}));

jest.mock("../context/task-context", () => ({
  ...jest.requireActual("../context/task-context"),
  useTasks: () => ({
    tasks: [],
    isLoading: false,
    getTasks: jest.fn(),
  }),
}));

describe("Home", () => {
  const queryClient = new QueryClient();

  it("renders the task manager title", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskProvider>
          <Home />
        </TaskProvider>
      </QueryClientProvider>
    );
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });

  it("renders the new task button", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskProvider>
          <Home />
        </TaskProvider>
      </QueryClientProvider>
    );
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("opens the task form when new button is clicked", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskProvider>
          <Home />
        </TaskProvider>
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByText("New"));
    expect(screen.getByText("Task Form")).toBeInTheDocument();
  });

  it("closes the task form when close button is clicked", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskProvider>
          <Home />
        </TaskProvider>
      </QueryClientProvider>
    );
    fireEvent.click(screen.getByText("New"));
    fireEvent.click(screen.getByText("Close"));
    expect(screen.queryByText("Task Form")).not.toBeInTheDocument();
  });

  it("renders the task list", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <TaskProvider>
          <Home />
        </TaskProvider>
      </QueryClientProvider>
    );
    expect(screen.getByTestId("task-list")).toBeInTheDocument();
  });
});
