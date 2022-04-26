import React, { Component } from 'react';
import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {

    static defaultProps = {
        country: 'in',
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 0,
            totalResults: 0
        }
    }

    Capitalize = (string) => {
        return string.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())
    }

    async componentDidMount(props) {
        this.props.setProgress(20);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pageSize=20`;
        document.title = `NewsMonkey - ${this.Capitalize(this.props.category)}`
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(40);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
            page: (this.state.page + 1)
        });
        this.props.setProgress(100);
    }

    fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.api}&page=${this.state.page}&pageSize=20`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            loading: false,
            page: (this.state.page + 1)
        });

    }

    // HandlePrevClick = async ()=>{
    //     this.setState({
    //         loading:true,
    //         page:this.state.page - 1
    //     });
    //     this.updateNews();
    // }

    // HandleNextClick = async ()=>{
    //     this.setState({
    //         page:this.state.page + 1,
    //         loading:true
    //     });
    //     this.updateNews();
    // }


    render() {
        return (
            <>
                <h1 className='text-center my-4'>News Monkey - Top {this.Capitalize(this.props.category)} Headlines</h1>
                {/* {this.state.loading && } */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={(this.state.articles.length !== this.state.totalResults)}
                    loader={<Loading />}
                >
                    <div className='container-fluid'>
                        <div className="row justify-content-center justify-content-md-start">
                            {this.state.articles.map((element) => {
                                return <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 my-3" key={element.url}>
                                    <NewsItem title={element.title ? element.title : 'Title!!'} description={element.description ? element.description : "Description!!"} publishedAt={element.publishedAt ? element.publishedAt : ''} source={element.source.name ? element.source.name : "unknown"} imageUrl={element.urlToImage ? element.urlToImage : "https://picsum.photos/340/190"} newsUrl={element.url} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between mx-2 my-2"> */}
                {/* <button type="button" className="btn btn-secondary" onClick={this.HandlePrevClick} disabled={this.state.page<=1}> &larr; Previous</button> */}
                {/* <button type="button" className="btn btn-secondary" onClick={this.HandleNextClick} disabled={(this.state.page+1) > Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr;</button> */}
                {/* </div> */}
            </>
        )
    }
}
