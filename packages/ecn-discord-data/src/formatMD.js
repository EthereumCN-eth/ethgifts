const fs = require("fs");
const  path =  require("path");
// const  { MD_DATA } = require("./types");
const mdjs =  require("@moox/markdown-to-json");

const formatMDWithFakedUser = () => {

  let contentsArray = [];
  let collectorArray = {};
  let collectors = [];

  const fileDir = fs.readdirSync(path.join(__dirname, './mdData/Export-6fb2e938-8417-41a6-ad3d-bc2d4c489011/E 群誌归档 d661467aef914c39abeb7fedc6e6b837/Untitled 09177050671e4a439ea5d2826af5eaa2'))

  for(let j = 0; j < fileDir.length; j++ ) {
    const onefile = fs.readFileSync(
      path.join(
        __dirname,
        `./mdData/Export-6fb2e938-8417-41a6-ad3d-bc2d4c489011/E 群誌归档 d661467aef914c39abeb7fedc6e6b837/Untitled 09177050671e4a439ea5d2826af5eaa2/${fileDir[j]}`
      ),
      "utf-8"
    );
  
    const output = mdjs.markdownAsJsTree(onefile)
      
    let contentCreatedAt;
    const title = output.title

    output.body['children'].map((entry) => {
      if(entry['tag'] === 'p') {
        contentCreatedAt = entry['children'][0].slice(10)
      }
    })
 

    const contentArray =  output.body['children'][4]['children'];
    for(let i = 1; i < contentArray.length; i++ ) {
      if(i % 2 === 0 ) continue
      const contents = contentArray[i]['children'];
      
      const content = contents[0].toString().trim();
      let links = [];
      for(let i = 1; i < contents.length - 1; i++ ) {
        if(contents[i]['tag'] === 'a') {
          links.push(contents[i]['props']['href']);
          // console.log(contents[i]['props']['href'])
        }
      }
      
      const collectorTextArray = contents[contents.length - 1].split(' ')
      const creatorName = collectorTextArray[collectorTextArray.length - 2] === 'by'? collectorTextArray[collectorTextArray.length - 1]: 
      collectorTextArray[collectorTextArray.length - 2] + ' ' + collectorTextArray[collectorTextArray.length - 1];
      const creator = creatorName.slice(0, -1);
      // console.log('debugging: ', contentCreatedAt, links)
  
      
      let fakeDiscordId = () => { return Math.floor((Math.random() * 1000)) }
      // for user data
      if(!collectors.includes(creator)) {
        collectors.push(creator);
        collectorArray[creator] = {
          discordId: fakeDiscordId().toString(),
          ethAddress: ""
        };
      }
      

      // format content result
      const result = 
      {
        title: title,
        mdDate: contentCreatedAt,
        messageId: Math.floor((Math.random() * 100000000000)).toString(),
        rawMessage: content+links,
        content: content,
        url: links.join(),
        contentType: 'uncategorized',
        discordName: creator,
        discordId: collectors[creator].discordId
      }
  
      contentsArray.push(result)
    }
  }

  fs.writeFileSync(path.join(__dirname, './originalData/contents.json'), JSON.stringify(contentsArray));
  fs.writeFileSync(path.join(__dirname, './originalData/collectors_initial.json'), JSON.stringify(collectorArray));  
};

formatMDWithFakedUser();