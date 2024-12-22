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

## Usage

Import the `useFetching` hook:

```typescript
import React, { useEffect } from 'react'
import { ActivityIndicator, Text } from 'react-native'
import { useFetching } from 'axios-handler'
import axios from 'axios'

const Component = () => {
  const { fetch, data, loading, error } = useFetching({
    query: async () => await axios.get('YourApi'),
    onComplete: response => {
      console.log('Response:', response)
    },
    onError: error => {
      console.log('Error:', error)
    },
    initialLoading: true,
  })

  useEffect(() => {
    fetch() // Trigger the request
  }, [])

  return (
    <>
      {loading && <ActivityIndicator />}
      {error && <Text>Error: {error.message}</Text>}
      {data && <Text>Data: {JSON.stringify(data.data)}</Text>}
    </>
  )
}

export default Component
```

## Hook Parameters and Return Values

### Parameters
- **`query`**: (Required) An `async` function that executes the Axios request.  
- **`onComplete`**: (Optional) Callback executed after a successful request, receiving the response.  
- **`onError`**: (Optional) Callback executed in case of an error, receiving the error object.  
- **`initialLoading`**: (Optional) Boolean indicating the initial loading state (default is `false`).

### Return Values
- **`fetch`**: Function to trigger the request.
- **`data`**: The response data from the request.
- **`loading`**: Boolean indicating if the request is in progress.
- **`error`**: Error object if the request fails.

## Contributing

Contributions are welcome!  
Feel free to open a pull request or an issue to discuss major changes or suggestions.

## License

This project is licensed under the [ISC License](https://github.com/ekosh02/axios-handler/blob/main/LICENSE).
