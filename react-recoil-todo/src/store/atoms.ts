import { atom } from "recoil";

export interface todoTemplate {
  id: number;
  text: string;
  isComplete: boolean;
}

export const todoListState = atom<todoTemplate[]>({
  key: "todoListState",
  default: [],
});
