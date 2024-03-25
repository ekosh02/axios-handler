# axios-handler

axios-handler is a hook that makes it easier and more convenient to work with axios library when executing queries.

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

Create controller:

```typescript
import axios, {AxiosResponse} from 'axios';

type YourType = {
  a: string;
  b: string;
};

class FetchController {
  static getData = async (): Promise<AxiosResponse<YourType>> => {
    return await axios.get('API');
  };
}

export {FetchController};
```
Import useFetching:

```typescript
import {useFetching} from 'axios-handler';
import {FC, useEffect} from 'react';
import {FetchController} from '../api/controllers/UpdateVersionController';

const Component: FC = () => {
  const {fetch, data, loading, error} = useFetching({
    query: () => FetchController.getData(),
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
* query: function or method returning an axios request
* onComplete: executed after a successful request and returns the result
* onError: executed in case of a request error and returns the result
* initialLoading: initial loading state value


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

<!-- [ISC]() -->