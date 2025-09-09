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
