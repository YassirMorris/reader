import { FC, ReactNode } from 'react';
import styles from './Prompt.module.scss';

interface PromptProps {
  element: ReactNode
}

const Prompt: FC<PromptProps> = ({ element }) => {
  return (
    <div className={styles.Prompt}>
      <div className={styles.Backdrop}/>
      <div className={styles.Content}>{element}</div>
    </div>
  )
};

export default Prompt;
