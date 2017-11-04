import Dispatcher from "../dispatcher/AppDispatcher";
import Constants from "../constants/AppConstants";

const AppActions = {
  LOAD_NOTES() {
    Dispatcher.handleViewAction({
      actionType: Constants.LOAD_NOTES
    });
  }
};

module.exports = AppActions;
