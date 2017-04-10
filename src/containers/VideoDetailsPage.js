import {connect} from 'react-redux';

import VideoDetailsPage from '../components/VideoDetailsPage';
import {getVideo} from '../actions/actionCreators';

const mapStateToProps = (state, ownProps) => ({
  video: state.videos.items.filter((video)=> {
    return video._id === ownProps.params.id;
  })[0]
});


export default connect(mapStateToProps)(VideoDetailsPage);