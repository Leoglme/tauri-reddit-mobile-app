import {integer} from "@vee-validate/rules";

export function removeAmpUrl(url: string){
    return url.replace(/amp;/g, '');
}

export function timestampToDate(timestamp: number) {
    const d = new Date(0);
    d.setUTCSeconds(timestamp);

    const months = [
        "janvier", "février", "mars", "avril", "mai", "juin", "juillet",
        "août", "septembre", "octobre", "novembre", "décembre"
    ];

    const date = new Date(d);
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();

    const month = months[monthIndex];

    return `${day} ${month} ${year}`;
}

export function numberWithSpaces(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}