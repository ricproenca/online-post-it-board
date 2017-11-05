// TODO: Missing validation JSON.parse
import config from "../config";
import Axios from "axios";

const urls = {
  base: config.apiUrl
};

const printError = error => {
  if (error.response) {
    // The server responded with a status code that falls out of the range of 2xx
    console.log(`ApiProvider Response Status: ${error.response.status}`);
    console.log(`ApiProvider Response Data: ${error.response.data}`);
    console.log(`ApiProvider Response Headers: ${error.response.headers}`);
  } else if (error.request) {
    // The request was made but no response was received
    console.log(`ApiProvider No Response: ${error.request}`);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log(`ApiProvider Error: ${error.message}`);
  }
  console.log(`ApiProvider config ${error.config}`);
};

const ApiProvider = {
  addNote(params, callback) {
    Axios.post(urls.base, params)
      .then(res => {
        callback(JSON.parse(res.data));
      })
      .catch(function(error) {
        printError(error);
      });
  }
};
export default ApiProvider;
