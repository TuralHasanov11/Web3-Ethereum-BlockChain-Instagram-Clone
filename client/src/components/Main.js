import React, { useRef } from 'react'
import { ethers } from 'ethers';

export default function Main({ uploadImage, captureFile, images, tipImageOwner }) {

  const imageDescriptionRef = useRef()

  async function submitForm(event) {
    event.preventDefault()
    uploadImage(imageDescriptionRef.current)
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '500px' }}>
          <div className="content mr-auto ml-auto">
            <h2>Share Image</h2>
            <form onSubmit={submitForm} >
              <div className="form-group mb-3">
                <input className="form-control" type="file" accept=".jpg, .jpeg, .png, .bmp, .gif" onChange={captureFile} />
              </div>
              <div className="form-group mb-3">
                <input
                  id="imageDescription"
                  type="text"
                  ref={imageDescriptionRef}
                  className="form-control"
                  placeholder="Image description..."
                  required />
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
            </form>
            <hr />
            {images.map((image, key) => {
              return (
                <div className="card mb-4" key={key} >
                  <img src={`https://ipfs.infura.io/ipfs/${image.hash}`} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{/* <img
                      className='mr-2'
                      width='30'
                      height='30'
                      src={`data:image/png;base64,${new Identicon(image.author, 30).toString()}`}
                    /> */}</h5>
                    <p className="card-text">{image.description}</p>
                    <small className="text-muted">{image.author}</small>
                    <small className="float-left mt-1 text-muted">
                      TIPS: {ethers.utils.formatEther(image.tipAmount.toString())} ETH
                    </small>
                    <button
                      className="btn btn-link btn-sm float-right pt-0"
                      onClick={() => { tipImageOwner(image.id, ethers.utils.parseUnits('0.1')) }}
                    >
                      TIP 0.1 ETH
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
