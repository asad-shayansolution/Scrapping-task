const axios = require('axios');
const  ProxyAgent  = require('proxy-agent');

// console.log("proxy = ", ProxyAgent)


async function checkProxy(proxyUrl) {
  const proxyAgent = axios.create({
    baseURL: 'https://example.com/',
    httpAgent: new ProxyAgent(proxyUrl),
    httpsAgent: new ProxyAgent(proxyUrl)
  });

  try {
    const response = await proxyAgent.get('/');
    if (response.status === 200) {
      console.log(`Proxy ${proxyUrl} is working`);
      return true;
    } else {
      console.log(`Proxy ${proxyUrl} is not working`);
      return false;
    }
  } catch (error) {
    console.log(`Proxy ${proxyUrl} is not working`, error.message);
    return false;
  }
}


checkProxy('http://80.92.206.140:30207');
// checkProxy('http://103.87.169.173:30207:56642'); //working
// checkProxy('http://134.209.108.182:8888');
// checkProxy('http://103.123.25.65:80');
// checkProxy('http://103.36.25.3:80');
