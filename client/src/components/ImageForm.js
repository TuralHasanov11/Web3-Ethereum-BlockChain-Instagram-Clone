import React, { useRef } from 'react'

export default function ImageForm({ uploadImage, captureFile }) {

  const imageDescriptionRef = useRef()

  async function submitForm(event) {
    event.preventDefault()
    uploadImage(imageDescriptionRef.current.value)
  }

  return (
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
          autoComplete='off'
          required />
      </div>
      <button type="submit" className="btn btn-primary btn-block btn-lg">Upload!</button>
    </form>
  )
}
