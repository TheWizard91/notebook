import React from "react"
// import ContentLoader from "react-content-loader"
import ContentLoader from "react-content-loader"

const ImageLoader = props => {
  return (
    <ContentLoader
      speed={2}
      viewBox="0 0 400 160"
      height={200}
      width={200}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"      
      {...props}
    >
      {/* <path d="M484.52,64.61H15.65C7.1,64.61.17,71.2.17,79.31V299.82c0,8.12,6.93,14.7,15.48,14.7H484.52c8.55,0,15.48-6.58,15.48-14.7V79.31C500,71.2,493.07,64.61,484.52,64.61Zm-9,204.34c0,11.84-7.14,21.44-15.94,21.44H436.39L359.16,171.52c-7.1-10.92-19.67-11.16-27-.51L258.64,277.94C253.78,285,245.73,286,240,280.2l-79.75-80.62c-6-6.06-14.33-5.7-20,.88L62.34,290.39H40.63c-8.8,0-15.94-9.6-15.94-21.44V110.19c0-11.84,7.14-21.44,15.94-21.44H459.54c8.8,0,15.94,9.6,15.94,21.44Z" />
      <ellipse cx="120" cy="140" rx="28" ry="28" /> */}
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" /> 
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" /> 
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" /> 
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" /> 
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" /> 
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  )
}

ImageLoader.metadata = {
  name: 'Agustin Ramos Peruzzo',
  github: 'agustinramos',
  description: 'Loader used in upload image process',
  filename: 'ImageUpload'
}

export default ImageLoader