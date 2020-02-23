import * as React from 'react';

export default function usePromise(promise) {
  const [status, setStatus] = React.useState('pending');
  const [result, setResult] = React.useState();

  let suspender = React.useMemo(() => promise.then(
    r => {
      setStatus("success");
      setResult(r);
    },
    e => {
      setStatus("error");
      setResult(e);
    }
  ), []);

  if (status === "pending") {
    throw suspender;
  } else if (status === "error") {
    throw result;
  } else if (status === "success") {
    return result;
  }
}
