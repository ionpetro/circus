import React from 'react';
import styles from './SocialCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { isThreeDaysAgo } from '../../utils/utilities';

const SocialCard = ({ media }) => {
  // show new label when the post was published the last 3 days
  const isNew = !isThreeDaysAgo(media.timestamp);

  return (
    <div className={`${styles.container} ${isNew && styles.new}`}>
      {isNew && (
        <div className={styles.newLabel}>
          <em>New</em>
        </div>
      )}
      <div className={styles.border}>
        <Link href={media.permalink}>
          <a target={'_blank'} rel={'noreferrer'}>
            <div className={styles.image}>
              <Image
                unoptimized
                key={media.id}
                layout={'fill'}
                objectFit={'cover'}
                objectPosition={'center'}
                alt={`instagram image ${media.id}`}
                src={
                  media.media_type === 'VIDEO'
                    ? media.thumbnail_url
                    : media.media_url
                }
              />
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default SocialCard;
