import {connect} from 'react-redux';

import VideoRating from '../components/VideoRating';
import {rateVideo} from '../actions/actionCreators';

//const getVideoRatingsById = (id, videos)=> {
//  if (videos.length > 0) {
//    const video = videos.filter((video) => {
//      return (video._id == id);
//    })[0];
//    return video.ratings;
//  } else {
//    return [1];
//  }
//}
//
//const mapStateToProps = (state, ownProps) => ({
//  ratings: getVideoRatingsById(ownProps.id, state.videos)
//});

const mapDispatchToProps = (dispatch, ownProps) => ({
  rateVideo : (rating) => {
    dispatch(rateVideo(ownProps.id, rating));
  }
});

export default connect(null, mapDispatchToProps)(VideoRating);
