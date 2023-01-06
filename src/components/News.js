import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {

    country: "in",
    category: "general",
    pageSize: 6

  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  }


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}-News`;
  };

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  async update() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6886180f2e794d29891ac64fe88df4b3&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url)
    let parseddata = await data.json()
    console.log(parseddata)
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,

    })

  }
  async componentDidMount() {
    // let url =  `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6886180f2e794d29891ac64fe88df4b3&page=1&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url)
    // let parseddata = await data.json()
    // console.log(parseddata)
    // this.setState({
    //   articles: parseddata.articles

    // })
    this.update()

  }
  handleNext = async () => {
    // console.log('Hello this is next');
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6886180f2e794d29891ac64fe88df4b3&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url)
    // let parseddata = await data.json()
    // console.log(parseddata)
    // this.setState({
    //   page:this.state.page +1,
    //   articles: parseddata.articles
    // })
    this.setState({ page: this.state.page + 1 })
    this.update()
  }

  handlePrev = async () => {
    // console.log('Hello this is previous');
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6886180f2e794d29891ac64fe88df4b3&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
    // let data = await fetch(url)
    // let parseddata = await data.json()
    // console.log(parseddata)
    // this.setState({
    //   page:this.state.page-1,
    //   articles: parseddata.articles

    // })
    this.setState({ page: this.state.page - 1 })
    this.update()

  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=6886180f2e794d29891ac64fe88df4b3&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url)
    let parseddata = await data.json()
    console.log(parseddata)
    this.setState({
      articles: this.state.articles.concat(parseddata.articles),
      // we have to concatinate the results lin order to achieve the infinite scroll 
      totalResults: parseddata.totalResults,
      loading:false
    })
  }


  render() {
    return (
      <div className='container'>
        <h2 className='my-4'>News Headlines</h2>
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles !== this.state.totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((element) => {
                return <div className='col-md-4 my-4' key={element.url}>
                  <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsurl={element.url} author={element.author} date={element.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        <div className="d-flex justify-content-between mb-2">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark " onClick={this.handlePrev}>Prev</button>
          <button type="button" className="btn btn-dark " onClick={this.handleNext}>Next</button>
        </div>

      </div>

    )
  }
}

export default News