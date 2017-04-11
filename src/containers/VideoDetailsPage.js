import {connect} from 'react-redux';

import VideoDetailsPage from '../components/VideoDetailsPage';
import {getVideo} from '../actions/thunkCreators';

const mapStateToProps = (state) => ({
  video: state.video
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getVideo: ()=> {dispatch(getVideo(ownProps.params.id));}
})
export default connect(mapStateToProps, mapDispatchToProps)(VideoDetailsPage);