
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);
  const isNegative = count < 0

  return (
    <div>
      <p>Count: {count}</p>
      <button type="button" onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button type="button" onClick={() => setCount(count - 1)}>
        Decrement
      </button>
      {isNegative &&  (<div data-testid="count-error">The counter can't be negative</div>)}
      
    </div>
  );
}

