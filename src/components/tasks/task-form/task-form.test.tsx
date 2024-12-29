import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { TaskForm } from "./task-form";
import { useTasks } from "@/context/task-context";

jest.mock("../../../context/task-context", () => ({
  useTasks: jest.fn(),
}));

describe("TaskForm", () => {
  const mockCreateTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTasks as jest.Mock).mockReturnValue({
      createTask: mockCreateTask,
      updateTask: mockUpdateTask,
    });
  });

  it("renders correctly for new task", () => {
    render(<TaskForm isOpen={true} onClose={mockOnClose} />);

    expect(screen.getByText("New Task")).toBeInTheDocument();
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it("renders correctly for editing task", () => {
    const taskToEdit = {
      id: "1",
      title: "Test Task",
      description: "Test Description",
    };
    render(<TaskForm isOpen={true} onClose={mockOnClose} task={taskToEdit} />);

    expect(screen.getByText("Edit Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Task")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
  });

  it("shows error when title exceeds 30 characters", () => {
    render(<TaskForm isOpen={true} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "A".repeat(31) } });

    expect(
      screen.getByText(/Title must be 30 characters or less/)
    ).toBeInTheDocument();
  });

  it("disables save button when title is too long", () => {
    render(<TaskForm isOpen={true} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "A".repeat(31) } });

    expect(screen.getByText("Save")).toBeDisabled();
  });

  it("calls createTask when submitting new task", async () => {
    render(<TaskForm isOpen={true} onClose={mockOnClose} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "New Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "New Description" },
    });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockCreateTask).toHaveBeenCalledWith({
        title: "New Task",
        description: "New Description",
      });
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("calls updateTask when submitting edited task", async () => {
    const taskToEdit = {
      id: "1",
      title: "Test Task",
      description: "Test Description",
    };
    render(<TaskForm isOpen={true} onClose={mockOnClose} task={taskToEdit} />);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: "Updated Task" },
    });
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: "Updated Description" },
    });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(mockUpdateTask).toHaveBeenCalledWith("1", {
        title: "Updated Task",
        description: "Updated Description",
      });
    });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("closes form when Cancel button is clicked", () => {
    render(<TaskForm isOpen={true} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
