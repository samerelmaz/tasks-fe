import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Toast } from "./toast";

describe("Toast", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders message correctly", () => {
    const message = "Test message";
    render(<Toast message={message} onClose={() => {}} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<Toast message="Test message" onClose={onClose} />);

    fireEvent.click(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose after duration", () => {
    const onClose = jest.fn();
    render(<Toast message="Test message" onClose={onClose} duration={5000} />);

    jest.advanceTimersByTime(5000);
    expect(onClose).toHaveBeenCalled();
  });

  it("cleans up timer on unmount", () => {
    const onClose = jest.fn();
    const { unmount } = render(
      <Toast message="Test message" onClose={onClose} duration={5000} />
    );

    unmount();
    jest.advanceTimersByTime(5000);
    expect(onClose).not.toHaveBeenCalled();
  });
});
