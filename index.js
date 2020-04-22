const constants = require('./src/utils/constants');
const fetch     = require('node-fetch');

exports.init = (apikey)=>{
    process.env.API_KEY = apikey;
}

exports.checkValidity = async (addr, startBlock, endBlock)=>{
    if(!addr || (startBlock > endBlock)){
        console.error("Invalid input");
    }
    
    return checkValidit(addr, startBlock, endBlock);
}


async function checkValidit(addr, startBlock, endBlock){
    let endPnt      = buildAPIEndPoint(addr, startBlock, endBlock);
    let obj_hist    = await getHistoricalData(endPnt);
    let validity    = isValid(obj_hist);
    console.log("Wallet " + addr + " valid ? " + validity);
}

function buildAPIEndPoint(addr, startBlock, endBlock){
    return constants.ETH_SCAN_API + "address=" + addr + "&startblock=" + (startBlock > 0 ? startBlock : 0) + (endBlock > 0 ? "&endblock=" + endBlock : "");
}

async function getHistoricalData(url){
    let request       = await fetch(url);
    return request.json();
}

function isValid(obj_hist){
    if(obj_hist.result && obj_hist.result.length > 0){
        return true;
    }else{
        return false;
    }
}