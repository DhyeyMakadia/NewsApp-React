import React from 'react'

const NewsItem = (props) => {
        let { title, description, imageUrl, newsUrl, publishedAt, source } = props;
        return (
            <>
                <div className="card mx-auto h-100">
                    <img src={imageUrl} style={{ objectFit: 'cover', height: '245px' }} className="card-img-top" data-toggle="tooltip" data-placement="top" title={source} alt="..." />
                    <div className="card-body">
                        <div className="d-flex justify-content-between flex-column h-100">
                            <div>
                                <h5 className="card-title">{title}</h5>
                                <p className="card-text">{description}</p>
                                <p className="card-text"><small className="text-muted">{new Date(publishedAt).toUTCString()}</small></p>
                                <p className="card-text"><small className="text-muted">By: {source}</small></p>
                            </div>
                            <div className='mt-3'>
                                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
}
export default NewsItem;