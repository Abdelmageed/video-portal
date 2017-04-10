import {connect} from 'react-redux';

import {getVideos} from '../actions/actionCreators';
import VideoGrid from '../components/VideoGrid';

const mapStateToProps = (state) => ({
  videos: state.videos.items,
  hasMore: !state.videos.loadedAll,
  loading: state.videos.loading
});

const mapDispatchToProps = (dispatch) => ({
  loadMore: ()=> {dispatch(getVideos());}
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoGrid);