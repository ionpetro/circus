import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/http-client';
import styles from './Social.module.scss';
import Stars from '../../public/assets/svgs/stars.svg';
import socialBack from '../../public/assets/images/socialBack.jpg';
import logo from '../../public/assets/images/logo.jpg';
import Image from 'next/image';
import SocialCard from '../SocialCard/SocialCard';
import { instaUrl } from '../../utils/links';
import UiSpinner from '../UiSpinner/UiSpinner';

const Social = () => {
  const mediaCount = 8;
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        setLoading(true);
        const { access_token } = await axiosInstance.get(
          `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN}`
        );
        const { data } = await axiosInstance.get(
          `https://graph.instagram.com/${process.env.NEXT_PUBLIC_INSTAGRAM_ID}/media?fields=media_type,thumbnail_url,media_url,timestamp,permalink,id&access_token=${access_token}`
        );
        setLoading(false);
        setMediaArray(data);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };
    fetchMedia();
  }, []);

  return (
    <section className={styles.compWrap} id={'social'}>
      <Image
        unoptimized
        alt={'circus facilities'}
        src={socialBack.src}
        className={styles.image}
        layout={'fill'}
        objectFit={'cover'}
        objectPosition={'center'}
      />
      <div className={styles.filter} />
      <div className={styles.transitionTop} />
      <div className={styles.content}>
        <div className={styles.header}>
          <Stars />
          <h2>INSTAGRAM</h2>
        </div>
        <div className={styles.insta}>
          <div className={styles.account}>
            <Image
              unoptimized
              alt={'circus instagram logo'}
              className={styles.instaLogo}
              width={80}
              height={80}
              src={logo.src}
            />
            <span className={styles.handle}>
              <a href={instaUrl} target={'_blank'} rel={'noreferrer'}>
                @circus.strongman.experience
              </a>
            </span>
          </div>
        </div>
        <div className={styles.main}>
          {loading ? (
            <UiSpinner />
          ) : error ? (
            <div className={styles.error}>
              Something went wrong with Instagram 😔 Click the insta handle
              above to visit the official page!
            </div>
          ) : (
            <div className={styles.media}>
              {mediaArray.slice(0, mediaCount).map((media) => (
                <SocialCard key={media.id} media={media} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className={styles.transitionBot} />
    </section>
  );
};

export default Social;
