import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to Ashes Stuffs',
  description: 'You can find childhood stuffs here',
  keywords: 'teks, Yu-Gi-Oh Cards, cards, 90s',
};

export default Meta;
