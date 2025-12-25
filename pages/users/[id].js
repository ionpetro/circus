import React from 'react';
import instance from '../../utils/http-client';
import User from '../../components/User/User';
import Head from 'next/head';

const strapiUrl = process.env.NEXT_PUBLIC_BACKEND;

const UserPage = ({ user }) => {
  return (
    <>
      <Head>
        <title>User | {user.username}</title>
      </Head>
      <User user={user} />
    </>
  );
};

export async function getStaticPaths() {
  let users;
  try {
    users = await instance(`${strapiUrl}/users`);
  } catch (e) { }

  let paths = [];

  if (users && Array.isArray(users)) {
    users.forEach((user) => paths.push({ params: { id: `${user.id}` } }));
  }

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }) {
  let user;
  try {
    user = await instance(`${strapiUrl}/users/${params.id}`);
  } catch (e) { }

  if (!user) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      user,
    },
  };
}
export default UserPage;
