import React, { ChangeEvent } from "react";
import { todoListState, todoTemplate } from "../store/atoms";
import { useRecoilState } from "recoil";

const TodoItem: React.FC<{ item: todoTemplate }> = (props): JSX.Element => {
  const [todoList, setTodoList] = useRecoilState<todoTemplate[]>(todoListState);
  const index = todoList.findIndex((listItem) => listItem === props.item);

  const editItemText = (event: ChangeEvent<HTMLInputElement>) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...props.item,
      text: event.target.value,
    });
    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...props.item,
      isComplete: !props.item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <>
      <input type="text" value={props.item.text} onChange={editItemText} />
      <input
        type="checkbox"
        checked={props.item.isComplete}
        onChange={toggleItemCompletion}
      />
      <button onClick={deleteItem}>X</button>
    </>
  );
};

export default TodoItem;

function replaceItemAtIndex(
  arr: todoTemplate[],
  index: number,
  newValue: todoTemplate
) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr: todoTemplate[], index: number) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}
