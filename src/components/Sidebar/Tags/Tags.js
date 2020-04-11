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

  let unit = 5;
  for (const tag of tags) unit = Math.max(unit, tag.totalCount);
  unit = Math.floor(unit / 5);

  return (
    <ul className={styles['tags__list']}>
      {tags.map(tag => {
        let colorIndex = Math.floor((tag.totalCount - 1) / unit);
        colorIndex = Math.max(0, Math.min(4, colorIndex));

        const colorType = colorIndex >= 3 ? 'white' : 'black';
        return (
          <li
            key={tag.fieldValue}
            className={styles['tags__list-item']}
            style={{ backgroundColor: palette[colorIndex] }}
          >
            <Link
              to={`/tag/${kebabCase(tag.fieldValue)}/`}
              className={styles[`tags__list-item-link-${colorType}`]}
              activeClassName={
                styles[`tags__list-item-link-${colorType}--active`]
              }
            >
              {tag.fieldValue} ({tag.totalCount})
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Tags;
