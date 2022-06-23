import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner.js';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

require('dotenv').config();

export class News extends Component {
    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: "general"
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
       
    }


    async componentDidMount() {
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=1&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles,
             totalResults: parsedData.totalResults,
             loading: false });
      
    }

    /*
    handlePrevClick = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=incategory=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();


        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

      handleNextClick = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=incategory=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parsedData = await data.json();

        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })

    }
    */

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${process.env.REACT_APP_API_KEY}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({ articles: this.state.articles.concat(parsedData.articles),
                       totalResults: parsedData.totalResults,
                         });
        this.setState({ loading: false });
                     
        console.log(parsedData);
    };




    render() {
        return (
            <>
                
                    <h1 className="text-center" style={{ marginBottom: "1%" }}><span className="badge rounded-pill bg-success"> NewsMarket - Top {this.capitalizeFirstLetter(this.props.category) } Headlines</span></h1>
                     {this.state.loading && <Spinner />}

                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={this.state.articles.length < 50 ? <Spinner/> : " "}
                    >

                        <div className="container">
                            <div className="row">
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} Url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>




                
            </>

        )
    }
}

export default News;

