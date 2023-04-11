export interface IApiRes {
    ok: boolean,
    result: IResult,
}

export interface IResult{
  code: string,
  short_link: string,
  full_short_link: string,
  short_link2: string,
  full_short_link2: string,
  share_link: string,
  full_share_link: string,
  original_link: string
}

export interface IUrlShortcode {
      short_link: string,
      short_link_href:string,
    }


export const API_RES_INIT: IApiRes = {
  ok: false,
  result: {
    code: "",
    short_link: "",
    full_short_link: "",
    short_link2: "",
    full_short_link2: "",
    share_link: "",
    full_share_link: "",
    original_link: ""
  }
}

export const URL_SHORT_CODE_INIT: IUrlShortcode[] = [
  {
    short_link: "",
    short_link_href: `https://`,
  }
]
