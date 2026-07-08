import Head from 'next/head';

const styles = {
  page: {
    background: '#1a1819',
    minHeight: '100vh',
    padding: '60px 24px 80px',
    color: '#f6e5bf',
  },
  container: {
    maxWidth: '720px',
    margin: '0 auto',
    lineHeight: 1.7,
  },
  h1: {
    color: '#ffffff',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    marginBottom: '4px',
  },
  updated: {
    color: '#b7b7b7',
    fontSize: '14px',
    marginBottom: '32px',
  },
  h2: {
    color: '#f2d15e',
    marginTop: '36px',
    marginBottom: '8px',
    letterSpacing: '1px',
  },
  p: {
    color: '#f6e5bf',
    margin: '8px 0',
  },
  li: {
    margin: '6px 0',
  },
  a: {
    color: '#f2d15e',
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Circus | Privacy Policy</title>
        <meta
          name="description"
          content="Privacy policy for the Circus Strongman Experience website and iOS app."
        />
      </Head>
      <div style={styles.page}>
        <div style={styles.container}>
          <h1 style={styles.h1}>Privacy Policy</h1>
          <p style={styles.updated}>Last updated: July 8, 2026</p>

          <p style={styles.p}>
            This policy describes how Circus Strongman Experience
            (&quot;Circus&quot;, &quot;we&quot;) handles your information when
            you use our website and our iOS app. Circus is a strongman gym
            located at Olvias 5, Athens 111 42, Greece.
          </p>

          <h2 style={styles.h2}>What we collect</h2>
          <ul>
            <li style={styles.li}>
              <strong>Account details</strong> — username, email address, and a
              password (stored as a secure hash, never in plain text).
            </li>
            <li style={styles.li}>
              <strong>Profile details</strong> — your display name, bodyweight
              category, and an optional avatar photo you choose to upload.
            </li>
            <li style={styles.li}>
              <strong>Training activity</strong> — the personal records you
              submit and the training slots you book.
            </li>
            <li style={styles.li}>
              <strong>Membership details</strong> — your plan, payment due
              date, and locker rental status, maintained by the gym staff.
            </li>
          </ul>

          <h2 style={styles.h2}>How we use it</h2>
          <p style={styles.p}>
            Your data is used only to run the Circus service: booking program
            slots, reviewing and publishing personal records, showing the
            leaderboard and hero profiles, and managing your membership. We do
            not run ads, we do not use analytics trackers, and we never sell
            or share your data with third parties for marketing.
          </p>

          <h2 style={styles.h2}>What other members can see</h2>
          <p style={styles.p}>
            The leaderboard and hero pages are visible to other visitors and
            show your username, avatar, bodyweight category, and approved
            records. Your email address and membership details are never shown
            publicly.
          </p>

          <h2 style={styles.h2}>Where it lives</h2>
          <p style={styles.p}>
            Account and training data are stored in our backend hosted on
            Heroku (Salesforce). Avatar photos are stored on Cloudinary. Both
            providers process data on our behalf and do not use it for their
            own purposes.
          </p>

          <h2 style={styles.h2}>Deleting your account</h2>
          <p style={styles.p}>
            You can permanently delete your account at any time from the iOS
            app (Profile → Settings → Delete account). This removes your
            profile, records, and bookings. You can also ask us at the gym and
            we will delete your account for you.
          </p>

          <h2 style={styles.h2}>Your rights</h2>
          <p style={styles.p}>
            Under the GDPR you can request access to, correction of, or
            deletion of your personal data, and you can ask for a copy of it.
            Contact us at the gym, by phone at{' '}
            <a style={styles.a} href="tel:6984102701">
              698 410 2701
            </a>
            , or via{' '}
            <a
              style={styles.a}
              href="https://www.instagram.com/circus.strongman.experience/"
            >
              Instagram
            </a>
            .
          </p>

          <h2 style={styles.h2}>Changes</h2>
          <p style={styles.p}>
            If this policy changes we will update this page and the &quot;last
            updated&quot; date above.
          </p>
        </div>
      </div>
    </>
  );
}
