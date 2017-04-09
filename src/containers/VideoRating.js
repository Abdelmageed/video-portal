import {connect} from 'react-redux';

import VideoRating from '../components/VideoRating';
import {rateVideo} from '../actions/actionCreators';

const getVideoById = (id, videos)=> {
  videos.filter((video) => {video._id === id})[0]
}

const mapStateToProps = (state, ownProps) => ({
  ratings: getVideoById(ownProps.id, state.videos).ratings
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  rateVideo : (rating) => {
    dispatch(rateVideo(ownProps.id, rating));
  }
})
