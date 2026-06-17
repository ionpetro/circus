import React from 'react';
import UserDashboard from '../../User/UserDashboard/UserDashboard';

const Overview = ({ user }) => {
  return <UserDashboard user={user} possessive={'Your'} />;
};

export default Overview;
