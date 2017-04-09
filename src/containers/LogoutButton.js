import {connect} from 'react-redux';

import LogoutButton from '../components/LogoutButton';
import {logout} from '../actions/actionCreators';

const mapDispatchToProps = (dispatch) => ({
  logout: () => {dispatch(logout());}
});

export default connect(null, mapDispatchToProps)(LogoutButton);