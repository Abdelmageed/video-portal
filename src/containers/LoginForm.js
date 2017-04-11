import {connect} from 'react-redux';

import {login} from '../actions/thunkCreators';
import LoginForm from '../components/LoginForm';

const mapStateToProps = (state) => ({
  error: state.user.login.error
});

const mapDispatchToProps = (dispatch) => ({
  submit: (credentials) => {dispatch(login(credentials));}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);