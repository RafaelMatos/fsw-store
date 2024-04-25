'use client'
import Image from 'next/image'
import { useState } from 'react'

interface ProductImagesProps {
  productName: string
  imageUrls: string[]
}

const ProductImages = ({ imageUrls, productName }: ProductImagesProps) => {
  const [currentImage, setCurrentImage] = useState(imageUrls[0])
  const handleImageClick = (imageUrl: string) => {
    setCurrentImage(imageUrl)
  }
  return (
    <div className="flex flex-col">
      <div className="flex h-[380px] w-full items-center justify-center rounded-lg  bg-accent">
        <Image
          src={currentImage}
          width={0}
          height={0}
          sizes="100vw"
          className="h-auto max-h-[70%] w-auto max-w-[80%]"
          style={{ objectFit: 'contain' }}
          alt={productName}
        />
      </div>
      <div className="mt-8 grid grid-cols-4 gap-4 ">
        {imageUrls.map((imageUrl) => {
          return (
            <button
              key={imageUrl}
              className={`flex h-[100px] items-center justify-center rounded-lg bg-accent
               ${imageUrl === currentImage && 'border-2 border-solid border-primary'}
              `}
              onClick={() => handleImageClick(imageUrl)}
            >
              <Image
                src={imageUrl}
                alt={productName}
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto max-h-[70%] w-auto max-w-[80%]"
              />
            </button>
          )
        })}
      </div>
    </div>
    // {Div outras imagens}
  )
}

export default ProductImages
