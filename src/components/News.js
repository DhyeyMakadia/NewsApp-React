import React, { useEffect, useState } from 'react';
import Loading from './Loading';
import NewsItem from './NewsItem';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const Capitalize = (string) => {
        return string.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())
    }

    useEffect(() => {
        const FetchData = async () => {
            props.setProgress(20)
            const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=20`;
            document.title = `NewsMonkey - ${Capitalize(props.category)}`
            setLoading(true);
            let data = await fetch(url);
            props.setProgress(40);
            let parsedData = await data.json()
            props.setProgress(70);
            setArticles(parsedData.articles);
            setTotalResults(parsedData.totalResults);
            setLoading(false);
            setPage(page+1);
            props.setProgress(100);
        }
        FetchData();
    }, [])

    const fetchMoreData = async () => {

        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=20`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setPage(page+1);
    }

        return (
            <>
                <h1 className='text-center mb-2' style={{marginTop:'75px'}}>News Monkey - Top {Capitalize(props.category)} Headlines</h1>
                { loading && <Loading /> }
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={(articles.length !== totalResults)}
                    loader={<Loading />}
                >
                    <div className='container-fluid'>
                        <div className="row justify-content-center justify-content-md-start">
                            {articles.map((element) => {
                                return <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12 my-3" key={element.url}>
                                    <NewsItem 
                                        title={element.title ? element.title : 'Title!!'} 
                                        description={element.description ? element.description : "Description!!"} 
                                        publishedAt={element.publishedAt ? element.publishedAt : ''} 
                                        source={element.source.name ? element.source.name : "unknown"} 
                                        imageUrl={element.urlToImage ? element.urlToImage : "https://picsum.photos/340/190"} 
                                        // author={element.author ? element.author : "Unknown"} 
                                        newsUrl={element.url} 
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="d-flex justify-content-between mx-2 my-2"> */}
                {/* <button type="button" className="btn btn-secondary" onClick={HandlePrevClick} disabled={page<=1}> &larr; Previous</button> */}
                {/* <button type="button" className="btn btn-secondary" onClick={HandleNextClick} disabled={(page+1) > Math.ceil(state.totalResults/props.pageSize)}>Next &rarr;</button> */}
                {/* </div> */}
            </>
        )
  
}

News.defaultProps = {
    country: 'in',
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
}
export default News;