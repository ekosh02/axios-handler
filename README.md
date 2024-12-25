# axios-handler

`axios-handler` is a React/React Native custom hook that simplifies and enhances the use of the Axios library for executing API requests efficiently.

## Installation

Install using npm:

```bash
npm install axios-handler axios
```

Or using yarn:

```bash
yarn add axios-handler axios
```

## Features

- Simplifies API request management in React and React Native applications.
- Built-in support for loading and error states.
- Supports dynamic parameters for API queries.
- Provides refresh and reset functionality for easy data manipulation.

---

## Quick Start

### Example Code

Here's an example of how to use `axios-handler` in a React Native project:

```jsx
import React, { useEffect } from 'react'
import { ActivityIndicator, Text, Button } from 'react-native'
import { useFetching } from 'axios-handler'
import axios from 'axios'

const Component = () => {
  const { fetch, refresh, data, loading, refreshing, error, reset } = useFetching({
    query: async props => {
      const { id, filters } = props
      return await axios.get(`api/v2/example/${id}`, { params: filters })
    },
    onComplete: response => {
      console.log('Response:', response)
    },
    onError: error => {
      console.log('Error:', error)
    },
    initialLoading: true,
  })

  useEffect(() => {
    fetch({ id: 123, filters: { test: 'test' } })
  }, [])

  return (
    <>
      {loading && <ActivityIndicator />}
      {refreshing && <ActivityIndicator />}
      {error && <Text>Error: {error.message}</Text>}
      {data && <Text>Data: {JSON.stringify(data.data)}</Text>}
      <Button title="Refresh" onPress={() => refresh({ id: 123, filters: { test: 'test' } })} />
      <Button title="Reset" onPress={reset} />
    </>
  )
}

export default Component
```

---

## API Documentation

### Hook Parameters

The `useFetching` hook accepts a configuration object with the following parameters:

| Parameter           | Type                                            | Description                                          | Required | Default |
| ------------------- | ----------------------------------------------- | ---------------------------------------------------- | -------- | ------- |
| `query`             | `(props?: any) => Promise<AxiosResponse<T, D>>` | Function to perform the HTTP request using Axios.    | Yes      | N/A     |
| `onComplete`        | `(response: AxiosResponse<T, D>) => void`       | Callback on successful request completion. response. | No       | N/A     |
| `onError`           | `(error: AxiosError<E>) => void`                | Callback on request failure. object.                 | No       | N/A     |
| `initialLoading`    | `boolean`                                       | Whether the request starts in a loading state.       | No       | `false` |
| `initialRefreshing` | `boolean`                                       | Whether the request starts in a refreshing state.    | No       | `false` |

---

### Return Values

The `useFetching` hook returns an object with the following properties:

| Property     | Type                             | Description                                              |
| ------------ | -------------------------------- | -------------------------------------------------------- |
| `fetch`      | `(props?: any) => Promise<void>` | Starts the HTTP request.                                 |
| `refresh`    | `(props?: any) => Promise<void>` | Re-triggers the request in a refreshing state.           |
| `data`       | `AxiosResponse<T, D> \| null`    | The response data or `null` if no request has been made. |
| `loading`    | `boolean`                        | Whether the request is loading.                          |
| `refreshing` | `boolean`                        | Whether the request is refreshing.                       |
| `error`      | `AxiosError<E> \| null`          | The error object if the request fails.                   |
| `reset`      | `() => void`                     | Resets the state to its initial values.                  |

---

### Type Definitions

Here are the type definitions used for the hook:

#### Parameters

```typescript
export type FetchingParams<T, D, E> = {
  query: (props?: any) => Promise<AxiosResponse<T, D>>;
  onComplete?: (response: AxiosResponse<T, D>) => void;
  onError?: (error: AxiosError<E>) => void;
  initialLoading?: boolean;
  initialRefreshing?: boolean;
};
```

#### Return Values

```typescript
export type FetchingReturn<T, D, E> = {
  fetch: (props?: any) => Promise<void>;
  refresh: (props?: any) => Promise<void>;
  data: AxiosResponse<T, D> | null;
  loading: boolean;
  refreshing: boolean;
  error: AxiosError<E> | null;
  reset: () => void;
};
```

---

## Contribution Guidelines

We welcome contributions! Here’s how you can help:

- Report issues or request features by opening an [issue](https://github.com/ekosh02/axios-handler/issues).
- Submit pull requests to suggest fixes or enhancements.

Before contributing, please ensure your code follows the project's style and passes all tests.

---

## License

This project is licensed under the [ISC License](https://github.com/ekosh02/axios-handler/blob/main/LICENSE).
