import {connect} from 'react-redux';

import Nav from '../components/Nav';

const mapStateToProps = (state)=> ({
  username: state.user.username
});

export default connect(mapStateToProps)(Nav);