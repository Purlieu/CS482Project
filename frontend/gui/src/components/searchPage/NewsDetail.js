import React from "react";
import PropTypes from "prop-types";

const News = ({ title, description, url }) => {
  return (
    <div>
      <p>{title}</p>
      <p>{description}</p>
      <p>{url}</p>
    </div>
  );
};

News.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default News;
