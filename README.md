# axios-handler

`axios-handler` is a React/React Native custom hook that simplifies and enhances the use of the Axios library for executing API requests efficiently.

## Installation

Install using npm:

```bash
npm install axios-handler
```

Or using yarn:

```bash
yarn add axios-handler
```

### Peer dependency:

### This library relies on axios for making HTTP requests. Make sure it is installed in your project:

Install using npm:

```bash
npm install axios
```

Or using yarn:

```bash
yarn add axios
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
  const { fetch, refresh, data, loading, refreshing, error, reset, fetchState } = useFetching({
    query: async (props) => {
      const { id, params } = props
      return await axios.get(`api/v2/example/${id}`, { params: params })
    },
    onComplete: (response) => {
      console.log('Response:', response)
    },
    onError: (error) => {
      console.log('Error:', error)
    },
    retryCount: 2,
    retryDelay: 1500,
    initialLoading: true,
    initialRefreshing: true,
  })

  useEffect(() => {
    fetch({ id: '1', params: { example: 'example' } })
  }, [])

  return (
    <>
      <Button title="Refresh" onPress={() => refresh({ id: '2', params: { example: 'example' } })} />
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

| Parameter           | Type                                              | Description                                          | Required | Default |
| ------------------- | ------------------------------------------------- | ---------------------------------------------------- | -------- | ------- |
| `query`             | `(props?: any) => Promise<AxiosResponse<T, D>>`   | Function to perform the HTTP request using Axios.    | Yes      | N/A     |
| `onComplete`        | `(response: AxiosResponse<T, D> \| null) => void` | Callback on successful request completion. response. | No       | N/A     |
| `onError`           | `(error: AxiosError<E> \| null) => void`          | Callback on request failure. object.                 | No       | N/A     |
| `initialLoading`    | `boolean`                                         | Whether the request starts in a loading state.       | No       | `false` |
| `initialRefreshing` | `boolean`                                         | Whether the request starts in a refreshing state.    | No       | `false` |
| `retryCount`        | `number`                                          | Number of times to retry the request on failure.     | No       | `1`     |
| `retryDelay`        | `number`                                          | Delay in milliseconds between retry attempts.        | No       | `1000`  |

---

### Return Values

The `useFetching` hook returns an object with the following properties:

| Property     | Type                                                             | Description                                                                                  |
| ------------ | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `fetch`      | `(props?: any) => Promise<void>`                                 | Starts the HTTP request.                                                                     |
| `refresh`    | `(props?: any) => Promise<void>`                                 | Re-triggers the request in a refreshing state.                                               |
| `data`       | `AxiosResponse<T, D> \| null`                                    | The response data or `null` if no request has been made.                                     |
| `loading`    | `boolean`                                                        | Whether the request is loading.                                                              |
| `refreshing` | `boolean`                                                        | Whether the request is refreshing.                                                           |
| `error`      | `AxiosError<E> \| null`                                          | The error object if the request fails.                                                       |
| `reset`      | `() => void`                                                     | Resets the state to its initial values.                                                      |
| `fetchState` | `'initial' \| 'loading' \| 'refreshing' \| 'success' \| 'error'` | General lifecycle state combining `loading`, `refreshing`, success and error into one field. |

---

## Contribution Guidelines

We welcome contributions! Here’s how you can help:

- Report issues or request features by opening an [issue](https://github.com/ekosh02/axios-handler/issues).
- Submit pull requests to suggest fixes or enhancements.

Before contributing, please ensure your code follows the project's style and passes all tests.

---

## License

This project is licensed under the [ISC License](https://github.com/ekosh02/axios-handler/blob/main/LICENSE).
