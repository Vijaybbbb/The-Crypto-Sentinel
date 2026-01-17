const fnHandleError = (objError, strContext = 'Operation') => {
  console.error(`${strContext} Error:`, objError.message);
  console.error('Stack:', objError.stack);
  
  if (objError.status) {
    throw objError;
  }
  
  const objNewError = new Error(`${strContext} failed: ${objError.message}`);
  objNewError.status = 500;
  throw objNewError;
};

module.exports = { handleError: fnHandleError };