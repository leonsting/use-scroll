# `use-scroll`

`use-scroll` is a React [hook](https://reactjs.org/docs/hooks-reference.html) that returns the browser viewport X and Y scroll position. It is highly optimized and using the special technics to avoid unnecessary rerenders!

> It uses the default react hooks rendering lifecycle, which allows you to fully control its behavior and prevent unnecessary renders.

## Install
```
yarn add use-scroll
```

## Usage

```jsx
useScroll(effect, selector, deps, element, wait)
```

| Arguments | Description |
| --------- | ----------- |
`effect`    | Effect callback.
`selector`      | Use `window` instead of `selector` if selector not set.
`deps`      | For effects  to fire on selected dependencies change.
`element`      | Get scroll position for a specified element by reference.
`wait`      | The `timeout` in ms. Good for performance.

> The `useScroll` returns `prevPos` and `currPos`.

## Examples

**Log current scroll position**
```jsx
import { useScroll } from '@n8tb1t/use-scroll-position'
  
useScroll(({ prevPos, currPos }) => {
  console.log(currPos.x)
  console.log(currPos.y)
})
```
**Change state based on scroll position - Inline CSS**
```jsx
import React, { useState } from 'react'
import { useScroll } from 'use-scroll'

const [headerStyle, setHeaderStyle] = useState({
  transition: 'all 200ms ease-in'
})

useScroll(
  ({ prevPos, currPos }) => {
    const isVisible = currPos.y > prevPos.y

    const shouldBeStyle = {
      visibility: isVisible ? 'visible' : 'hidden',
      transition: `all 200ms ${isVisible ? 'ease-in' : 'ease-out'}`,
      transform: isVisible ? 'none' : 'translate(0, -100%)'
    }

    if (JSON.stringify(shouldBeStyle) === JSON.stringify(headerStyle)) return

    setHeaderStyle(shouldBeStyle)
  },
  [headerStyle]
)

const Header = <header style={{ ...headerStyle }} />
```

**Change state based on scroll position - Styled Components**
```jsx
import React, { useState } from 'react'
import { useScroll } from 'use-scroll'

const [hideOnScroll, setHideOnScroll] = useState(true)
  
useScroll(({ prevPos, currPos }) => {
  const isShow = currPos.y > prevPos.y
  if (isShow !== hideOnScroll) setHideOnScroll(isShow)
}, [hideOnScroll])
```
**Get scroll position for custom element**
```jsx
  const [elementPosition, setElementPosition] = useState({ x: 20, y: 150 })
  const elementRef = useRef()
  
    // Element scroll position
  useScroll(
    ({ currPos }) => {
      setElementPosition(currPos)
    }, [], elementRef
  )
```
