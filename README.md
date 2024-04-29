# axios-handler

axios-handler is a React/React Native hook that makes it easier and more convenient to work with axios library when executing queries.

## Installation

Using npm:

```bash
npm i axios-handler axios
```

Using yarn:

```bash
yarn add axios-handler axios
```

## Usage

Import useFetching:

```typescript
import {useFetching} from 'axios-handler';
import {FC, useEffect} from 'react';
import {FetchController} from '../controllers/FetchController';
import axios from 'axios'

const Component: FC = () => {
  const {fetch, data, loading, error} = useFetching({
    query: async () => await axios.get('YourApi'),
    onComplete: response => {
      console.log('response', response);
    },
    onError: error => {
      console.log('error', error);
    },
    initialLoading: true
  });

  useEffect(() => {
    fetch();
  }, []);

  return null;
};

export default Component;
```


* fetch: function to start a request
* data: to receive data
* loading: request loading state
* error: error occurred during the request
* query: axios query return
* onComplete: executed after a successful request and returns the result
* onError: executed in case of a request error and returns the result
* initialLoading: initial loading state value


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.


## License

[ISC](https://github.com/ekosh02/axios-handler/blob/main/LICENSE)