import React, { FC } from 'react';
import styles from './Disclaimer.module.scss';

interface DisclaimerProps {}

const Disclaimer: FC<DisclaimerProps> = () => (
  <div className={styles.Disclaimer}>
    Disclaimer Component
  </div>
);

export default Disclaimer;
