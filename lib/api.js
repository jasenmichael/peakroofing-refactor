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

export function getFileByUuid(uuid) {
  // https://api1.majaqu.com/peakroofing/api/file/file?filter[uuid]=55e2c1e7-1cbf-4c6b-b962-c5f7769adc6f&fields[file--file]=uuid,filename,uri,filesize,changed
  const uri = `api/file/file?filter[uuid]=${uuid}`
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
      // console.log(image.data)
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
            url: res.data[0].attributes.uri.url.replace('/peakroofing', 'https://api1.majaqu.com/peakroofing'),
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

export function getTeam() {
  // https://api1.majaqu.com/peakroofing/api/node/team_members
  return jsonApi.get(`api/node/team_members`)
  .then((res) => {
    let team = res.data
    let teamNinjas = []
    team.forEach((ninja) => {
      // console.log(ninja.attributes)
      let ninjaData = {
        name: ninja.attributes.title,
        created: ninja.attributes.created,
        changed: ninja.attributes.changed,
        description: ninja.attributes.body.processed,
        social_links: ninja.attributes.field_social_links,
        website: ninja.attributes.feild_website
      }
      getFileByUuid(ninja.relationships.field_profile_image.data.id)
      .then((res) => {
        let ninjaImage = {
          profile_image: res.data[0].attributes.uri.url.replace('/peakroofing', 'https://api1.majaqu.com/peakroofing')
        }
        let ninjaImageAndData = {...ninjaData, ...ninjaImage}
        teamNinjas.push(ninjaImageAndData)
      })
    })
    return teamNinjas
  })
}