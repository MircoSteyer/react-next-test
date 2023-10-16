"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { useEditable } from "@/lib/hooks/useEditable";
import { Todo } from "@/lib/interfaces/todo";

export interface TodoInputProps {
  addTodo: (title: Todo["title"]) => void;
}
const TodoInput = ({ addTodo }: TodoInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { editable } = useEditable();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submitInput();
    }
  };
  const submitInput = () => {
    addTodo(inputValue);
    setInputValue("");
  };

  return (
    <>
      <Input
        disabled={!editable}
        value={inputValue}
        placeholder={"Add a todo here"}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button disabled={!editable} onClick={submitInput}>
        Submit
      </Button>
    </>
  );
};

TodoInput.displayName = "TodoItem";
export default TodoInput;
