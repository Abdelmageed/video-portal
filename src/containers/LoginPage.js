import {connect} from 'react-redux';

import LoginPage from '../components/LoginPage';
import {login} from '../actions/actionCreators';

const mapDispatchtoProps = (dispatch)=> ({
  mockLogin: ()=> {dispatch(login({username: 'ali', password: 'password'}));}
});

export default connect(null, mapDispatchtoProps)(LoginPage);