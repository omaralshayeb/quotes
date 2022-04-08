import { useEffect } from 'react';
import QuoteList from '../components/quotes/QuoteList';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import NoQuotesFound from '../components/quotes/NoQuotesFound';

const AllQuotes = () => {
  //using the custom hook to get state and http function
  //and loading it with an api function
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  //making the request to get all quotes on startup
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  //rendering spinner, error or data based on state variables...

  if (status === 'pending') {
    return (
      <div classname="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  //passing data to QuoteList
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
