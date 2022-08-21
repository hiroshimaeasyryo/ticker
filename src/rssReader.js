let viewXML = (xmlDocument) => {
    //取得した文字列をコンソール出力
    console.log(xmlDocument);

    //XML形式に変換
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlDocument, "text/xml");
    let ddl = doc.documentElement;
    let items = ddl.getElementsByTagName("item");
    let source = ddl.getElementsByTagName("title")[0].textContent;

    
    let rss = doc.documentElement.getElementsByTagName("item");

    // //rssをシャッフル
    shuffleRSS = _.shuffle(rss)

    //HTMLタグの作成
    let tagString = ''
    for(let i=0 ; i<shuffleRSS.length ; i++){
        //RSSから取得したタイトルとリンク情報を格納
        let rssTitle = shuffleRSS[i].getElementsByTagName("title")[0].textContent;
        let rssLink  = shuffleRSS[i].getElementsByTagName("link")[0].textContent;
        let rssDatetime = (shuffleRSS[i].getElementsByTagName("dc:date")[0].textContent).substring(0,10)+ " " +
                          (shuffleRSS[i].getElementsByTagName("dc:date")[0].textContent).substring(11,16);
        //テンプレート文字列を使ってアンカータグを作成
        tagString = `<a href="${rssLink}" class="rssLink">${rssTitle} 【${source} : ${rssDatetime}】</a> ◆◆◆◆◆◆◆◆◆◆◆◆ `;

        //body以下にアンカータグを挿入
        let elem = document.getElementById('insertRSS');
        elem.insertAdjacentHTML('beforeend',tagString );
    }
};

let URLS = [
    'https://assets.wor.jp/rss/rdf/nikkei/news.rdf',
    'https://assets.wor.jp/rss/rdf/reuters/top.rdf',
    'https://assets.wor.jp/rss/rdf/bloomberg/top.rdf',
    'https://news.ntv.co.jp/rss/index.rdf',
    'https://www.asahi.com/rss/asahi/newsheadlines.rdf',
    'https://assets.wor.jp/rss/rdf/ynnews/news.rdf',
    'https://xtech.nikkei.com/rss/index.rdf',
    'http://feeds.cnn.co.jp/rss/cnn/cnn.rdf?_ga=2.33797217.1759416903.1660832158-699500.1660832158',
    'https://feeds.dailyfeed.jp/feed/s/6/791.rss'
];

for (let i=0 ; i<URLS.length ; i++){
    fetch(URLS[i])
    .then( response => response.text())
    .then( xmlData => viewXML(xmlData));
}