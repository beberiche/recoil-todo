import React, { useCallback } from "react";
import "./TodoList.scss";
import { useRecoilState } from "recoil";
import { todosState, ITodoTypes } from "../../recoil/todo";
import TodoItem from "./TodoItem/TodoItem";

const TodoList = (): JSX.Element => {
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);

  const onComplete = useCallback(
    (id: number): void => {
      setTodos(
        todos.map((todo: ITodoTypes) => {
          return todo.id === id
            ? { ...todo, isCompelted: !todo.isCompleted }
            : todo;
        })
      );
    },
    [setTodos, todos]
  );

  const onDelete = useCallback(
    (id: number): void => {
      setTodos(todos.filter((todo: ITodoTypes) => todo.id !== id));
    },
    [setTodos, todos]
  );

  return (
    <div className="TodoList">
      {todos.length > 0 ? (
        todos.map((todo: ITodoTypes) => {
          const { id, contents, isCompleted } = todo;
          return (
            <TodoItem
              key={id}
              id={id}
              contents={contents}
              isCompleted={isCompleted}
              onComplete={onComplete}
              onDelete={onDelete}
              todos={todos}
              setTodos={setTodos}
            />
          );
        })
      ) : (
        <div className="TodoList-NoList">
          Todo가 없습니다. 자유롭게 추가해보세요!
        </div>
      )}
    </div>
  );
};

export default TodoList;
