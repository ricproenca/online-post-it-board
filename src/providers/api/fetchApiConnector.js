const buildResponse = (response, error) => {
  if (error) {
    return { errors: true, response: response };
  }
  return { errors: false, response: response.json() };
};

const FetchApiConnector = {
  fetchNotes(url, callback) {
    return fetch(url)
      .then(response => {
        callback(buildResponse(response));
      })
      .catch(error => {
        callback(buildResponse(error, true));
      });
  }
};

export default FetchApiConnector;
