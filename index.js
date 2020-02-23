import {useState, useMemo} from 'react';

export default function usePromise(promise) {
  const [status, setStatus] = useState('pending');
  const [result, setResult] = useState();

  let suspender = useMemo(() => promise.then(
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
