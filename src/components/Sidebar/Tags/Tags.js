// @flow strict
import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import styles from './Tags.module.scss';
import getRandomPalette from '../../../utils/contentscript';

type Props = {
  tags: {
    fieldValue: string,
    totalCount: string
  }[]
};

const Tags = ({ tags }: Props) => {
  const palette = getRandomPalette();
  return (
    <>
      <ul className={styles['tags__list']}>
        {tags.map(tag => {
          let colorIndex = Math.floor(tag.totalCount / 2);
          if (colorIndex >= 5) colorIndex = 4;

          return (
            <li
              key={tag.fieldValue}
              className={styles['tags__list-item']}
              style={{ backgroundColor: palette[colorIndex] }}
            >
              <Link
                to={`/tag/${kebabCase(tag.fieldValue)}/`}
                className={styles['tags__list-item-link']}
                activeClassName={styles['tags__list-item-link--active']}
              >
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Tags;
