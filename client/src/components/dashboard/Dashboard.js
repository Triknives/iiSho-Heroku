import React, {useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount} from '../../actions/profile';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import Spinner from '../layout/Spinner';



const Dashboard = ({
    deleteAccount,
    getCurrentProfile, 
    auth:{ user },
     profile: {profile, loading}
    }) => {
    useEffect( ( ) => {
        getCurrentProfile();
    }, [getCurrentProfile] );

    return loading && profile === null ? ( 
    <Spinner />
     ) : ( 
    <Fragment>
       <h1 className="large">Profile</h1>
        <p className="lead">
        <i className="fas fa-user" />  Hello {user && user.name}!
        </p>
        {profile !== null ? (
            <Fragment>
                <DashboardActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div className="my-2">
                    <button className="btn btn-danger" onClick={() => deleteAccount() }>
                    Delete Account
                    </button>
                </div>
            </Fragment>
         ) : (
            <Fragment>
                <p>You don't seem to have a profile, set one up? This is a great way for pontential employers or team members to get to know you!</p>
                <Link to="/create-profile" className="btn btn-primary my-1">
                Create Profile
                </Link>
            </Fragment>
        )}
 </Fragment>
     );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
  };
  
  const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile
  });
  
  export default connect(mapStateToProps, { deleteAccount,getCurrentProfile})(
    Dashboard
  );
