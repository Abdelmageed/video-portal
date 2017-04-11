import {connect} from 'react-redux';

import VideoRating from '../components/VideoRating';
import {rateVideo} from '../actions/thunkCreators';

const mapDispatchToProps = (dispatch, ownProps) => ({
  rateVideo : (rating) => {
    dispatch(rateVideo(ownProps.id, rating));
  }
});

export default connect(null, mapDispatchToProps)(VideoRating);
