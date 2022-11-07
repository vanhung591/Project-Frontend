import {configureStore} from "@reduxjs/toolkit";
import channelReducer from "redux/channel/channel";

export default configureStore({
  reducer: {
      channel: channelReducer
  }
})