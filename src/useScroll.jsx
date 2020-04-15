/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useLayoutEffect } from 'react';

const isBrowser = typeof window !== 'undefined';

function getScrollPosition({ element, scrollSelector }) {
    if (!isBrowser) return { x: 0, y: 0 };

    const target = element ? element?.current : document.body;
    const position = target?.getBoundingClientRect();

    return element
        ? { x: position?.left, y: position?.top }
        : scrollSelector
        ? { x: scrollSelector?.scrollTop, y: scrollSelector?.scrollLeft }
        : { x: window.scrollX, y: window.scrollY };
}

export function useScroll (effect, selector, deps, element, wait){
    const scrollSelector = selector ? document.querySelector(selector) : window;
    const position = useRef(getScrollPosition({ scrollSelector }));

    let throttleTimeout = null;

    const callBack = () => {
        const currPos = getScrollPosition({ element, scrollSelector });
        effect({ prevPos: position?.current, currPos });
        position.current = currPos;
        throttleTimeout = null;
    };
    useLayoutEffect(() => {
        if (!isBrowser) {
            return;
        }

        const handleScroll = () => {
            if (wait) {
                if (throttleTimeout === null) {
                    throttleTimeout = setTimeout(callBack, wait);
                }
            } else {
                callBack();
            }
        };
        scrollSelector.addEventListener('scroll', handleScroll);
        return () => scrollSelector.removeEventListener('scroll', handleScroll);
    }, deps);
};

useScroll.defaultProps = {
    deps: [],
    element: false,
    wait: null,
};
