import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
      let {title,imageUrl,newsurl,author,date,description} = this.props 
    return (
        <div className="card">
          <img src={imageUrl==null?"https://c.ndtvimg.com/2019-02/a4datfog_air-india-generic-pixabay-240_625x300_12_February_19.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className='card-text'><small className='text-muted'>By {author?author:'Unknown'}<br></br>{new Date(date).toGMTString()}</small></p>
              <a href={newsurl}  rel='noreferrer'target='_blank' className="btn btn-sm btn-primary">Read more</a>
            </div>
        </div>
    )
  }
}

export default NewsItem