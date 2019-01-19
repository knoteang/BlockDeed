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
        "name": "section",
        "type": "uint256"
      },
      {
        "name": "numberOfsection",
        "type": "uint256"
      },
      {
        "name": "district",
        "type": "string"
      },
      {
        "name": "docNo",
        "type": "uint256"
      },
      {
        "name": "county",
        "type": "string"
      },
      {
        "name": "province",
        "type": "string"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "nationality",
        "type": "string"
      },
      {
        "name": "size",
        "type": "uint256"
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
        "name": "traNo",
        "type": "uint256"
      },
      {
        "name": "docNo",
        "type": "uint256"
      },
      {
        "name": "mortgage",
        "type": "address"
      },
      {
        "name": "mortgagee",
        "type": "address"
      },
      {
        "name": "money",
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
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "str",
        "type": "string"
      }
    ],
    "name": "print_string",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "size",
        "type": "uint256"
      }
    ],
    "name": "print_uint",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "section",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "numberOfsection",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "district",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "docNo",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "county",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "province",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "name",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "nationality",
        "type": "string"
      },
      {
        "indexed": false,
        "name": "size",
        "type": "uint256"
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
        "name": "array",
        "type": "uint256[]"
      }
    ],
    "name": "print_arrayuint",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "id",
        "type": "address"
      },
      {
        "name": "section",
        "type": "uint256"
      },
      {
        "name": "numberOfsection",
        "type": "uint256"
      },
      {
        "name": "district",
        "type": "string"
      },
      {
        "name": "docNo",
        "type": "uint256"
      },
      {
        "name": "county",
        "type": "string"
      },
      {
        "name": "province",
        "type": "string"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "nationality",
        "type": "string"
      },
      {
        "name": "size",
        "type": "uint256"
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
        "name": "_mortgage",
        "type": "address"
      },
      {
        "name": "_mortgagee",
        "type": "address"
      },
      {
        "name": "_money",
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
    "name": "getLastTransaction",
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
var contractAddress = '0x7501Ad4f0bc1879bd104c823fb6A14C8343cA4a8';
var contractInstance = contract.at(contractAddress);

function sendDocument(){
  var section = document.getElementById('Csection').value ;
  var numberOfsection = document.getElementById('CnumberOfsection').value ;
  var district = document.getElementById('Cdistrict').value ;
  var documentNumber = document.getElementById('CdocumentNumber').value ;
  var county = document.getElementById('Ccounty').value ;
  var province = document.getElementById('Cprovince').value ;
  var name  = document.getElementById('Cfirstname').value + " " + document.getElementById('Clastname').value ;
  var nationality = document.getElementById('Cnationality').value ;
  var ownerAddress = document.getElementById('CownerAddress').value ;
  var size = document.getElementById('Csize').value ;

  var estimateGas = contractInstance.sendDocument.estimateGas(ownerAddress,section,numberOfsection,district,documentNumber,
    county,province,name,nationality,size);

  contractInstance.sendDocument(ownerAddress,section,numberOfsection,district,documentNumber,
    county,province,name,nationality,size,{ gas: estimateGas },function (error, result) {
     if (!error) {
       console.log(web3.eth.getTransaction(result));
     }else{
       console.log(error);
     }
  });
}

function getDocument(){
    var documentNumber = document.getElementById('GdocumentNumber').value;
    var estimateGas = contractInstance.getDocument.estimateGas(documentNumber);
    console.log(documentNumber);
    contractInstance.getDocument(documentNumber,{ gas: estimateGas });
    contractInstance.print_document(function (error, result) {
     if (!error) {
        console.log(result);
        document.getElementById('Gsection').value = result.args.section ;
        document.getElementById('GnumberOfsection').value = result.args.numberOfsection ;
        document.getElementById('Gdistrict').value = result.args.district ;
        document.getElementById('GdocumentNumberR').value = result.args.docNo ;
        document.getElementById('Gcounty').value = result.args.county ;
        document.getElementById('Gprovince').value = result.args.province ;
        var tmpName = result.args.name.split(" ");
        document.getElementById('Gfirstname').value = tmpName[0] ;
        document.getElementById('Glastname').value = tmpName[1] ;
        document.getElementById('Gnationality').value = result.args.nationality ;
        document.getElementById('Gsize').value = result.args.size ;
     }else{
       console.log("error");
     }
  });
}

function saveTransaction(){

  var documentNumber = document.getElementById('STdocumentNumber').value ;
  var detail = document.getElementById('STdetail').value ;
  var money = document.getElementById('STmoney').value ;
  var puGiver = document.getElementById('STnameGiver').value ;
  var puReceiver = document.getElementById('STnameReceiver').value ;

  var estimateGas = contractInstance.saveTransaction.estimateGas(documentNumber,puGiver,puReceiver,money,detail);
  //document.getElementById('noDocGet').innerHTML = contractInstance.getDocument(addr);
  contractInstance.saveTransaction(documentNumber,puGiver,puReceiver,money,detail,{ gas: estimateGas },function (error, result) {
     if (!error) {
       console.log(web3.eth.getTransaction(result));
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
        console.log();
     }else{
       console.log(error);
     }
  });
}

function getTransaction(){
  var documentNumber = document.getElementById('GTdocumentNumber').value ;
  //var transactionNumber = document.getElementById('STtransactionNumber').value

  var estimateGas = contractInstance.getTransaction.estimateGas(documentNumber);
  contractInstance.getTransaction(documentNumber,{ gas: estimateGas });
  contractInstance.print_arrayuint(function (error, result) {
     if (!error) {
        console.log(result);
     }else{
       console.log(error);
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
