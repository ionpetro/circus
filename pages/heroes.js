import Leaderboard from '../components/Leaderboard/Leaderboard';
import Head from 'next/head';
import Heroes from '../components/Heroes/Heroes';

export default function HeroesPage() {
  return (
    <>
      <Head>
        <title>Circus | Heroes</title>
      </Head>
      <Heroes />
    </>
  );
}
