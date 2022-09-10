import React, { useState, ChangeEvent } from "react";
import { todoListState } from "../store/atoms";
import { useSetRecoilState } from "recoil";

const TodoItemCreator = (): JSX.Element => {
  const [inputValue, setInputValue] = useState<string>("");
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = (): void => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      { id: getId(), text: inputValue, isComplete: false },
    ]);
    setInputValue("");
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <input type="text" value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </>
  );
};

export default TodoItemCreator;

let id = 0;
function getId() {
  return id++;
}
