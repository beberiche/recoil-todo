import React, { ChangeEvent, useCallback, KeyboardEvent } from "react";
import { FaPen } from "react-icons/fa";
import "./TodoInput.scss";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { inputState, todosState, ITodoTypes } from "../../recoil/todo";

const TodoInput = () => {
  const [contents, setContents] = useRecoilState<string>(inputState);
  const todos = useRecoilValue<ITodoTypes[]>(todosState);
  const setTodos = useSetRecoilState<ITodoTypes[]>(todosState);

  const addTodo = useCallback((): void => {
    if (!contents.trim()) return;

    const nextId: number =
      todos.length > 0 ? todos[todos.length - 1].id + 1 : 0;

    const todo: ITodoTypes = {
      id: nextId,
      contents,
      isCompleted: false,
    };

    setTodos([...todos, todo]);
    setContents("");
  }, [contents, setContents, setTodos, todos]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const { value } = e.target;
      setContents(value);
    },
    [setContents]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === "Enter") addTodo();
    },
    [addTodo]
  );

  return (
    <div className="TodoInput">
      <input
        type="text"
        className="TodoInput-Input"
        placeholder="Todo를 입력해보세요!"
        value={contents}
        onChange={onChange}
        onKeyDown={onKeyDown}
      ></input>
      <FaPen className="TodoInput-Button" onClick={addTodo} />
    </div>
  );
};

export default TodoInput;
