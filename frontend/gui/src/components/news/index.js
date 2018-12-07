import React, { Component } from "react";
import PropTypes from "prop-types";

import NewsDetail from "./NewsDetail";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Pagination from "material-ui-flat-pagination";

class News extends Component {
  state = { offset: 0, limit: 4 };

  handleClick = offset => {
    this.setState({ offset });
  };

  renderNews = latestNews => {
    let currentPageNews;

    if (this.state.offset === 0) {
      currentPageNews = latestNews.slice(0, this.state.limit);
    } else {
      currentPageNews = latestNews.slice(
        this.state.offset,
        this.state.offset + this.state.limit
      );
    }
    console.log(currentPageNews)
    return currentPageNews.map(news => {
      return (
        <NewsDetail
          title={news.title}
          description={news.description}
          url={news.url}
          key={news.title}
          image={news.urlToImage}
        />
      );
    });
  };

  render() {
    let { latestNews } = this.props;
    return (
      <div>

        <List>{this.renderNews(latestNews)}</List>
        <Grid container justify='center'>
          <Pagination
            limit={this.state.limit}
            offset={this.state.offset}
            total={latestNews.length}
            onClick={(e, offset) => this.handleClick(offset)}
            currentPageColor='inherit'
          />
        </Grid>
      </div>
    );
  }
}

News.propTypes = {
  latestNews: PropTypes.array.isRequired
};

export default News;
