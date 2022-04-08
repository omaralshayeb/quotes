import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import QuoteForm from '../components/quotes/QuoteForm';
import useHttp from '../hooks/use-http';
import { addQuote } from '../lib/api';

const NewQuote = () => {
  //using custom hook
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();

  //going back to AllQuotes when request finishs
  useEffect(() => {
    if (status === 'completed') {
      navigate('/quotes');
    }
  }, [status, navigate]);

  //request will be made when submitting the form
  const addQuoteHandler = quoteData => {
    sendRequest(quoteData);
  };

  return (
    <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
