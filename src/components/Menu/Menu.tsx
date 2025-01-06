import React from 'react';

import styles from './Menu.module.sass';

export interface MenuProps {
  prop?: string;
}

export function Menu({prop = 'default value'}: MenuProps) {
  return <div className={styles.Menu}>Menu {prop}</div>;
}
