import { DependencyList, EffectCallback, MutableRefObject } from "react";

interface ScrollProps {
  prevPos: {
    x: number;
    y: number;
  },
  currPos: {
    x: number;
    y: number;
  }
}

export declare function useScroll(
  effect: (props: ScrollProps) => void,
  selector?: string,
  deps?: DependencyList,
  element?: MutableRefObject<HTMLElement | null>,
  wait?: number
): void;
