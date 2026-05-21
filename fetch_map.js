const fs = require('fs');
const https = require('https');

const urls = {
  sichuan: 'https://geo.datav.aliyun.com/areas_v3/bound/510000_full.json',
  chongqing: 'https://geo.datav.aliyun.com/areas_v3/bound/500000_full.json',
  guizhou: 'https://geo.datav.aliyun.com/areas_v3/bound/520000_full.json'
};

const fetchJson = (url) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
};

async function main() {
  try {
    const sc = await fetchJson(urls.sichuan);
    const cq = await fetchJson(urls.chongqing);
    const gz = await fetchJson(urls.guizhou);
    
    const combined = {
      type: 'FeatureCollection',
      features: [
        ...sc.features,
        ...cq.features,
        ...gz.features
      ]
    };
    
    fs.writeFileSync('map_data.json', JSON.stringify(combined));
    console.log('Map data saved to map_data.json');
  } catch (e) {
    console.error(e);
  }
}

main();
