import React from 'react';
import marked from 'marked';
import styles from './Topbar.module.scss';

const Topbar = ({ news }) => {
  if (news) {
    return (
      <div className={styles.compWrap}>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: marked(news) }}
        />
      </div>
    );
  }
  return null;
};

export default Topbar;
