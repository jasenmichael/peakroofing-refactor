import jsonApi from './jsonApiClient'

export function getPageContentByTitle(title) {
  // http://api1.majaqu.com/api/node/page?filter[title]=home
  const uri = `api/node/page?filter[title]=${title}&fields[node--page]=title,body,uuid,changed,nid,path`
  return jsonApi.get(uri)
}

export function getPageContentByPath(path) {
  // http://api1.majaqu.com/api/node/page?filter[field_path][value]=/contact-us
  const uri = `api/node/page?filter[field_path][value]=${path}&fields[node--page]=title,body,uuid,changed,nid,path`
  return jsonApi.get(uri)
}

export function getMenu(menu) {
  const uri = `entity/menu/${menu}/tree?_format=json`
  return jsonApi.get(uri)
}

export function getImageGalleryByPath(path) {
  // https://api1.majaqu.com/peakroofing/api/node/image_gallery?filter[field_path][value]=/gallery/main-banner-slideshow&fields[node--image-gallery]=nid,uuid,changed,path,field_path,field_image
  const uri = `api/node/image_gallery?filter[field_path][value]=${path}&fields[node--image-gallery]=nid,uuid,changed,path,field_path,field_image`
  return jsonApi.get(uri)
  .then((res) => {
    const gallery = res.data[0].relationships.field_image.data
    let reConstructedGallery = []
    gallery.forEach((image) => {
      let imageData = {
        id: image.id,
        alt: image.meta.alt,
        title: image.meta.title,
        width: image.meta.width,
        height: image.meta.height,
      }
      getFileByUuid(image.id)
        .then((res) => {
          let imageFileInfo = {
            filename: res.data[0].attributes.filename,
            url: res.data[0].attributes.uri.url.replace(process.env.SUB_DIR, process.env.REST_URL),
            filesize: res.data[0].attributes.filesize,
            created: res.data[0].attributes.created,
            changed: res.data[0].attributes.changed
          }
          let mergedImageData = {...imageData, ...imageFileInfo}
          reConstructedGallery.push(mergedImageData)
        })
    })
    return reConstructedGallery
  })
}

export function getFileByUuid(uuid) {
  // https://api1.majaqu.com/peakroofing/api/file/file?filter[uuid]=55e2c1e7-1cbf-4c6b-b962-c5f7769adc6f&fields[file--file]=uuid,filename,uri,filesize,changed
  const uri = `api/file/file?filter[uuid]=${uuid}`
  return jsonApi.get(uri)
}