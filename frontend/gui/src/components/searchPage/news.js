import React from "react";
import PropTypes from "prop-types";

import NewsDetail from "./NewsDetail";

const News = ({ latestNews }) => {
  return (
    <div>
      {latestNews.map(news => {
        return (
          <NewsDetail
            title={news.title}
            description={news.description}
            url={news.url}
            key={news.title}
          />
        );
      })}
    </div>
  );
};

News.propTypes = {
  latestNews: PropTypes.array.isRequired
};

export default News;
