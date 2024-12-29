import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskList } from "./task-list";
import { useTasks } from "@/context/task-context";

jest.mock("../../../context/task-context", () => ({
  useTasks: jest.fn(),
}));

describe("TaskList", () => {
  const mockOnEditTask = jest.fn();

  const mockTasks = [
    {
      id: "1",
      title: "Task 1",
      description: "Description 1",
      completed: false,
      createdAt: "2023-01-01",
    },
    {
      id: "2",
      title: "Task 2",
      description: "Description 2",
      completed: true,
      createdAt: "2023-01-02",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows loading state", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
      isLoading: true,
    });

    render(<TaskList onEditTask={mockOnEditTask} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("shows empty state message when no tasks", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: [],
      isLoading: false,
    });

    render(<TaskList onEditTask={mockOnEditTask} />);
    expect(screen.getByText(/No tasks/)).toBeInTheDocument();
  });

  it("renders task cards when tasks exist", () => {
    (useTasks as jest.Mock).mockReturnValue({
      tasks: mockTasks,
      isLoading: false,
    });

    render(<TaskList onEditTask={mockOnEditTask} />);
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });
});
