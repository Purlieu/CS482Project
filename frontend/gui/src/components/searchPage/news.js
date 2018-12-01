import React from "react";
import PropTypes from "prop-types";

import NewsDetail from "./NewsDetail";
import List from "@material-ui/core/List";

const News = ({ latestNews }) => {
  return (
    <List>
      {latestNews.map(news => {
        return (
          <NewsDetail
            title={news.title}
            description={news.description}
            url={news.url}
            key={news.title}
            image={news.urlToImage}
          />
        );
      })}
    </List>
  );
};

News.propTypes = {
  latestNews: PropTypes.array.isRequired
};

export default News;
