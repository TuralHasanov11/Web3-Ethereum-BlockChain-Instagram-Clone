import React from 'react'
import { ethers } from 'ethers';

export default function ImageCard({ image, tipImageOwner }) {
  return (
    <div><div className="card image-card mb-4"  >
      <img src={`https://turalhasanov.infura-ipfs.io/ipfs/${image.hash}`} className="card-img-top" alt="..." />
      <div className="card-body">
        <p className="card-text">{image.description}</p>
        <small className="text-muted">{image.author}</small>
        <small className="float-left mt-1 text-muted">
          TIPS: {ethers.utils.formatEther(image.grantAmount.toString())} ETH
        </small>
        <button
          className="btn btn-link btn-sm float-right pt-0"
          onClick={() => { tipImageOwner(image.id, ethers.utils.parseUnits('0.1')) }}
        >
          TIP 0.1 ETH
        </button>
      </div>
    </div></div>
  )
}
