export function removeAmpUrl(url: string){
    return url.replace(/amp;/g, '');
}
