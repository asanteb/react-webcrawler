const rp = require('request-promise')
const cheerio = require('cheerio')
var domain = 'https://youtube.com'
let options = {
    uri: domain,
    transform: (body) => {
        return cheerio.load(body)
    }
}

rp(options)
    .then(($)=>{
        let start = new Date()
        let len = $('a').get().length
        let arr = []
        let comp
        if(len > 0){
            $('a').each((i, elm)=>{
                arr.push(elm.attribs.href)
                comp = elm.attribs.href
                
            })
            console.log(arr)
            var links_arr = arr
             
                        //let link_search
            var index = 0
            while(links_arr[index] != links_arr[links_arr.length-1]){
                let link = links_arr[index]
                if(link &&
                    (
                        (
                            (link.includes('http://www.'+domain) || link.includes('https://www.'+domain))
                            || (link.includes('http://'+domain) || link.includes('https://'+domain))
                        )
                        && (!link.includes('=www.'+domain) || !link.includes('='+domain))
                        && (link.charAt(4) == ':' || link.charAt(5) == ':')
                    ) || 
                        (
                            link && (link.charAt(0) == '/' || link.charAt(0) == '.' || (link.charAt(4) != ':' || link.charAt(5) != ':'))
                            && (!link.includes('//'))
                        )
                    ){
                        if (link.charAt(0) == '/'){link = domain+link}
                        else if (link.charAt(0) == '.'){link = domain+link.slice(1, link.length-1)}
                        else if (!link.includes('https://') && !link.includes('https://')){link = domain+'/'+link}
                        else{link = link}
                        //console.log(link)
                        let opt = {
                            uri: link,
                            transform: (body) => {
                                return cheerio.load(body)
                            }
                        }
                        rp(opt)
                        .then((q)=>{
                            if(q('a').get().length > 0){
                                q('a').each((i, elm)=>{
                                    //console.log('second: '+ elm.attribs.href)
                                    //console.log('this thing on?')
                                    links_arr.push(elm.attribs.href)
                                })
                            }
                        })
                        .catch((err)=>{
                            console.log(err)
                        })
                    }
                index++
            }
            console.log(links_arr)
            console.log('total: '+links_arr.length)
        }
        else{
            console.log('Website is a single page app or has no other possible routes')
        }
        //console.log(text)
    })
    .catch((err)=>{
        console.log(err)
    })