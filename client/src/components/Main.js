import React, { useRef } from 'react'
import ImageCard from './ImageCard';
import ImageForm from './ImageForm';

export default function Main({ uploadImage, captureFile, images, tipImageOwner }) {

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto">
          <div className="content mr-auto ml-auto">
            <div className="row justify-content-center mb-5">
              <div className="col-12 col-sm-8 col-md-6">
                <div className="card card-body">
                  <h2>Share Image</h2>
                  <ImageForm uploadImage={uploadImage} captureFile={captureFile} />
                </div>
              </div>
            </div>
            <hr />
            <div className="row justify-content-center">
              {images.map((image, key) => {
                return (
                  <div key={key} className="col-12 col-sm-6 col-md-4 col-xl-3 m-2">
                    <ImageCard tipImageOwner={tipImageOwner} image={image} />
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
