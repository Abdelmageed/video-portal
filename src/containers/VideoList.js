import {connect} from 'react-redux';

import {getVideos} from '../actions/actionCreators';
import VideoList from '../components/VideoList';

const mapStateToProps = (state) => ({
  videos: state.videos
});

const mapDispatchToProps = (dispatch) => ({
  loadMore: ()=> {dispatch(getVideos());}
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoList);