import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { TaskCard } from "./task-card";
import { useTasks } from "@/context/task-context";
import dayjs from "dayjs";

jest.mock("../../../context/task-context", () => ({
  useTasks: jest.fn(),
}));

const mockUpdateTask = jest.fn();
const mockTask = {
  id: "1",
  title: "Test Task",
  description: "Test Description",
  completed: false,
  createdAt: "2023-06-01T00:00:00.000Z",
};

const mockDeleteTask = jest.fn();
const mockOnEdit = jest.fn();

describe("TaskCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useTasks as jest.Mock).mockReturnValue({
      deleteTask: mockDeleteTask,
      updateTask: mockUpdateTask,
    });
  });

  it("renders task details correctly", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />);

    expect(screen.getByText("Test Task")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(
      screen.getByText(
        `Created at: ${dayjs(mockTask.createdAt).format("DD/MM/YYYY")}`
      )
    ).toBeInTheDocument();
  });

  it("calls onEdit when edit button is clicked", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByLabelText("Edit task"));
    expect(mockOnEdit).toHaveBeenCalled();
  });

  it("calls deleteTask when delete button is clicked", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByLabelText("Delete task"));
    expect(mockDeleteTask).toHaveBeenCalledWith("1");
  });

  it("calls updateTask when status button is clicked", () => {
    render(<TaskCard task={mockTask} onEdit={mockOnEdit} />);

    fireEvent.click(screen.getByText("Mark as complete"));
    expect(mockUpdateTask).toHaveBeenCalledWith("1", { completed: true });
  });

  it("renders correct status button text based on completed status", () => {
    const completedTask = { ...mockTask, completed: true };
    const { rerender } = render(
      <TaskCard task={completedTask} onEdit={mockOnEdit} />
    );

    expect(screen.getByText("Mark as pending")).toBeInTheDocument();

    rerender(<TaskCard task={mockTask} onEdit={mockOnEdit} />);
    expect(screen.getByText("Mark as complete")).toBeInTheDocument();
  });
});
