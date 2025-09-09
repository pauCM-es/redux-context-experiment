# Research Findings: React Context API

## Test 1: Basic Behavior of Context API with Different Data Types

### Setup

- Implementation of a basic context with three types of state:
  - `counter` (number): Primitive numeric value
  - `list` (array): Collection of strings
  - `record` (object): Complex data structure

### Observations

- When modifying any of the three states through their respective setters, **all** components that consume the context through the custom hook (`useBasicContext`) are re-rendered.
- This behavior occurs regardless of the data type (primitive or non-primitive) being modified.
- There is no distinction between updates of different properties: any change in the global state triggers a complete re-rendering of all consumers.

### Implications

- React's Context API does not implement any automatic optimization to prevent unnecessary renders.
- Consumer components have no knowledge of which specific part of the context has changed; they only detect that "something" in the context has been modified.
- For applications with complex state or components that render frequently, this behavior can lead to significant performance issues.

## Test 2: Propagation of Renders Through Component Hierarchy

### Test Configuration

- Creation of isolated components that don't consume the context:
  - Nested hierarchy of components (Item inside ItemsList inside ItemsContainer)
  - These isolated components are rendered alongside components that do consume the context

### Render Behavior Findings

- When a parent container component consumes the context hook, all of its children re-render when the context changes, regardless of whether those children consume the context or not.
- When the parent container does not consume the context hook, the isolated child components do not re-render when the context changes.

### Performance Considerations

- Context consumption affects not just the component itself but its entire descendant tree.
- Components that don't need context data but are children of context consumers will still re-render unnecessarily.
- Strategic placement of context consumers in the component tree is critical for performance optimization.
- Using component composition patterns (like children props) or memoization techniques may help isolate renders and prevent unnecessary re-renders of components that don't depend on context.

## Test 3: Component Re-Rendering with Local State Changes

### Experimental Setup

- Components with local state using `useState` (e.g., input field in `ListActions`)
- Child components receiving props that don't change between renders (e.g., `ItemsList` receiving a stable `list` array)

### Re-Render Patterns Observed

- Even when using local state in a parent component (like `list` in `ListActions`), any state change in the parent (e.g., `newListItem`) causes a complete re-render of all child components.
- The array reference for `list` is preserved between renders, but this alone doesn't prevent child components from re-rendering.
- Child components re-render not because their props changed, but because their parent component re-rendered.

### Performance Optimizations

- Wrapping child components with `React.memo()` prevents re-renders when their props don't change.
- Using `React.memo()` on both `ItemsList` and `Item` components effectively breaks the re-render chain for state changes unrelated to the list data.
- This optimization is important for both context consumers and regular components with local state.

## Test 4: Separating Context by State Type

### Context Separation Approach

- Split the original combined context (`BasicContext`) into three separate contexts:
  - `CounterContext`: Manages only the counter state
  - `ListContext`: Manages only the list state
  - `RecordContext`: Manages only the record state
- Created a `CombinedContextProvider` that nests all three providers

### Expected Behavior

- Components that consume only one specific context (e.g., only `CounterContext`) should re-render only when that specific state changes.
- Components consuming multiple contexts will still re-render when any of those contexts change.
- The original `useBasicContext` hook now combines all three specific hooks, maintaining backward compatibility.

### Implications for Performance

- More granular context consumption allows for more precise control over component rendering.
- Components can subscribe only to the exact state they need, preventing unnecessary re-renders.
- This pattern follows the principle of separation of concerns and can significantly improve performance in larger applications.
- Trade-off: Requires more provider nesting and potentially more complex component structure.

## Test 5: Read/Write Separation Pattern

### Context Division Strategy

- Further refined the `ListContext` by splitting it into two separate but related contexts:
  - `ListDataContext`: Read-only access to the list data (used by monitors/displays)
  - `ListApiContext`: Access to operations that modify the list (used by action components)
- Both contexts share the same state internally, but expose different parts to consumers

### Implementation Details

- Created dedicated hooks for each purpose:
  - `useListDataContext()`: For components that only need to read list data
  - `useListApiContext()`: For components that need to modify list data
  - `useListContext()`: Maintained for backward compatibility, provides both data and API

### Benefits Observed

- Clearer separation of concerns between components that display data vs. components that modify data
- Each component only re-renders when the specific aspects of the context it cares about change
- Better encapsulation of state management logic within the context provider
- More explicit API design with dedicated methods instead of raw state setters

### Architectural Implications

- This pattern resembles the Command Query Responsibility Segregation (CQRS) pattern from backend development
- It scales well to more complex applications by providing clear boundaries between reads and writes
- Reduces the chance of unnecessary re-renders by limiting what each component subscribes to
- Trade-off: Increases initial complexity but improves maintainability in the long run
