var Web3 = require('web3');
var web3 = new Web3();

// 1. Connect to the node
web3.setProvider(new web3.providers.HttpProvider('http://localhost:7545'));

// 2. Check node status
function checkStatus(){
    if(web3.isConnected()){
        document.getElementById('node_status').innerHTML =  "TRUE";
    }else{
        document.getElementById('node_status').innerHTML =  "FALSE";
    }
}

/*
* The code below is used for interaction with the smart contract
*/

// Assign the account for action to smart contract

web3.eth.defaultAccount = web3.eth.accounts[9];
// The ABI of the contract
var abiArray = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allDocument",
    "outputs": [
      {
        "name": "id",
        "type": "address"
      },
      {
        "name": "docNo",
        "type": "uint256"
      },
      {
        "name": "location",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allList",
    "outputs": [
      {
        "name": "docNo",
        "type": "uint256"
      },
      {
        "name": "traNo",
        "type": "uint256"
      },
      {
        "name": "detail",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "allEndTransaction",
    "outputs": [
      {
        "name": "traNo",
        "type": "uint256"
      },
      {
        "name": "status",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "doc",
        "type": "string"
      }
    ],
    "name": "print_document",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "number",
        "type": "uint256[]"
      }
    ],
    "name": "print_array",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_id",
        "type": "address"
      },
      {
        "name": "_docNo",
        "type": "uint256"
      },
      {
        "name": "_location",
        "type": "string"
      }
    ],
    "name": "sendDocument",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_docNo",
        "type": "uint256"
      },
      {
        "name": "_traNo",
        "type": "uint256"
      },
      {
        "name": "_datail",
        "type": "string"
      }
    ],
    "name": "saveTransaction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_traNo",
        "type": "uint256"
      }
    ],
    "name": "endTransaction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_docNo",
        "type": "uint256"
      }
    ],
    "name": "getDocument",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_docNo",
        "type": "uint256"
      }
    ],
    "name": "getTransaction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

var contract = web3.eth.contract(abiArray);
// The address of the contract
var contractAddress = '0x0605A78FAf777F4a5786E17A0dD03Ad413196A71';
var contractInstance = contract.at(contractAddress);


function ShowEther(){
  document.getElementById('a1Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0]),"ether");
  document.getElementById('a2Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1]),"ether");
  document.getElementById('a3Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[2]),"ether");
  document.getElementById('a4Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[3]),"ether");
  document.getElementById('a5Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[4]),"ether");
  document.getElementById('a6Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[5]),"ether");
  document.getElementById('a7Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[6]),"ether");
  document.getElementById('a8Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[7]),"ether");
  document.getElementById('a9Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[8]),"ether");
  document.getElementById('a10Ether').innerHTML = web3.fromWei(web3.eth.getBalance(web3.eth.accounts[9]),"ether");
}

function ShowAddr(){
  document.getElementById('a1Addr').innerHTML = web3.eth.accounts[0] ;
  document.getElementById('a2Addr').innerHTML = web3.eth.accounts[1] ;
  document.getElementById('a3Addr').innerHTML = web3.eth.accounts[2] ;
  document.getElementById('a4Addr').innerHTML = web3.eth.accounts[3] ;
  document.getElementById('a5Addr').innerHTML = web3.eth.accounts[4] ;
  document.getElementById('a6Addr').innerHTML = web3.eth.accounts[5] ;
  document.getElementById('a7Addr').innerHTML = web3.eth.accounts[6] ;
  document.getElementById('a8Addr').innerHTML = web3.eth.accounts[7] ;
  document.getElementById('a9Addr').innerHTML = web3.eth.accounts[8] ;
  document.getElementById('a10Addr').innerHTML = web3.eth.accounts[9] ;
}

function sendDocument(){
  var addr = document.getElementById('addrSend').value ;
  var noDoc = document.getElementById('noDocSend').value ;
  var location = document.getElementById('loSend').value ;
  var estimateGas = contractInstance.sendDocument.estimateGas(addr,noDoc,location);
  contractInstance.sendDocument(addr,noDoc,location,{ gas: estimateGas },function (error, result) {
     if (!error) {
       console.log("seccess");
     }else{
       console.log(contractInstance.sendDocument.estimateGas(addr,noDoc,location));
     }
  });
}

function getDocument(){
  var noDoc = document.getElementById('docGet').value ;
  //document.getElementById('noDocGet').innerHTML = contractInstance.getDocument(addr);
  contractInstance.getDocument(noDoc);
  contractInstance.print_document(function (error, result) {
     if (!error) {
        console.log(result);
        document.getElementById('loGet').innerHTML = result.args.doc;
     }else{
       console.log("error");
     }
  });
}

function saveTransaction(){
  var noTran = document.getElementById('tranSave').value ;
  var noDoc = document.getElementById('noDocSend').value ;
  var details = document.getElementById('deSave').value ;
  var estimateGas = contractInstance.saveTransaction.estimateGas(noDoc,noTran,details);
  //document.getElementById('noDocGet').innerHTML = contractInstance.getDocument(addr);
  contractInstance.saveTransaction(noDoc,noTran,details,{ gas: estimateGas },function (error, result) {
     if (!error) {
        console.log("seccess");
     }else{
       console.log(error);
     }
  });
}

function endTransaction(){
  var noTran = document.getElementById('tranEnd').value ;
  //document.getElementById('noDocGet').innerHTML = contractInstance.getDocument(addr);
  contractInstance.endTransaction(noTran,function (error, result) {
     if (!error) {
        console.log(result);
     }else{
       console.log(error);
     }
  });
}

function getTransaction(){
  var noDoc = document.getElementById('tranGet').value ;
  //document.getElementById('noDocGet').innerHTML = contractInstance.getDocument(addr);
  contractInstance.getTransaction(noDoc);
  contractInstance.print_document(function (error, result) {
     if (!error) {
        console.log(result);
        document.getElementById('loGet').innerHTML = result.args.doc;
     }else{
       console.log("error");
     }
  });
}

function checkContract(){
  var noDoc = document.getElementById('docCheck').value ;
  //document.getElementById('noDocGet').innerHTML = contractInstance.getDocument(addr);
  contractInstance.checkContract(noDoc,function (error, result) {
     if (!error) {
        console.log(result);
     }else{
       console.log(error);
     }
  });
}
