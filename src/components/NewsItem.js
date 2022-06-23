import React, { Component } from 'react'


export class NewsItem extends Component {
    render() {
        let { title, description, imageUrl, Url, author, publishedAt , source} = this.props
        return (
            <>
                <div className="card my-3">

                    <img src={imageUrl} className="card-img-top" alt="...." />

                    <div className="card-body">

                        <h5 className="card-title">{title}<span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{left:"82%",zIndex:"1"}}>
                            {source}
                           
                        </span></h5>
                        <p className="card-text">{description}</p>
                        {/* <p className="card-text"><small className="text-muted"><span className="badge rounded-pill bg-danger">By {!author ? "Unknown" : author} on {new Date(publishedAt).toGMTString()}</span> </small></p> */}
                        <a rel="noreferrer" href={Url} target="_blank" className="btn btn-success btn-sm rounded-pill">Read More</a>
                    </div>
                </div>


            </>
        )
    }
}

export default NewsItem;
