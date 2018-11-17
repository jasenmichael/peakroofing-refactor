import jsonApi from './jsonApiClient'

export function getPageContentByPath(path) {
    // http://api1.majaqu.com/api/node/page?filter[field_path][value]=/contact-us
    const uri = `api/node/page?filter[field_path][value]=${path}&fields[node--page]=title,body,uuid,changed,nid,path` 
    return jsonApi.get(uri)
  }

export function getPageContentByTitle(title) {
// http://api1.majaqu.com/api/node/page?filter[title]=home
const uri = `api/node/page?filter[title]=${title}&fields[node--page]=title,body,uuid,changed,nid,path` 
return jsonApi.get(uri)
}

export function getMenu(menu) {
    const uri = `entity/menu/${menu}/tree?_format=json` 
    return jsonApi.get(uri)
  }