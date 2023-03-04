import { ReactElement } from "react";

export type Emoji = {
  id: number;
  name: string;
  icon: string;
  gif?: ReactElement,
  sound?: string,
};
