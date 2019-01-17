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
    "type": "function",
    "signature": "0x50d53846"
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
        "name": "detail",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function",
    "signature": "0x9366a13e"
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
    "type": "function",
    "signature": "0xad407de7"
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
    "type": "event",
    "signature": "0xa5014519207066148cceb1209c0da9b5bc063b5c80fb25da53261714be79574b"
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
    "type": "event",
    "signature": "0x692c952151b417a9943d2d683df661e7680bee63e10c12a77b4681793f8c3435"
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
    "type": "event",
    "signature": "0x10a19bf8962a5ef50d20dc3f6b90c40a666b880a9215fc321bde36161b586116"
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
    "type": "function",
    "signature": "0x93ebf88b"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_traNo",
        "type": "uint256"
      },
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
        "name": "_datail",
        "type": "string"
      }
    ],
    "name": "saveTransaction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0xc0332eec"
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
    "type": "function",
    "signature": "0x24281a96"
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
    "type": "function",
    "signature": "0x3f9b250a"
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
    "type": "function",
    "signature": "0x45838c42"
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
      }
    ],
    "name": "getTransaction",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function",
    "signature": "0x7303f6ce"
  }
];

var contract = web3.eth.contract(abiArray);
// The address of the contract
var contractAddress = '0x63B8e14BABab2D5a5e023F469168C2B2DF792642';
var contractInstance = contract.at(contractAddress);

function sendDocument(){
  var section = document.getElementById('Csection').value ;
  var numberOfsection = document.getElementById('CnumberOfsection').value ;
  //var surveyPage = document.getElementById('CsurveyPage').value ;
  var district = document.getElementById('Cdistrict').value ;
  var documentNumber = document.getElementById('CdocumentNumber').value ;
  //var bookNo = document.getElementById('CbookNo').value ;
  //var bookPage = document.getElementById('CbookPage').value ;
  var county = document.getElementById('Ccounty').value ;
  var province = document.getElementById('Cprovince').value ;
  var firstname = document.getElementById('Cfirstname').value ;
  //var lastname = document.getElementById('Clastname').value ;
  var nationality = document.getElementById('Cnationality').value ;
  var ownerAddress = document.getElementById('CownerAddress').value ;
  var size = document.getElementById('Csize').value ;

  var estimateGas = contractInstance.sendDocument.estimateGas(ownerAddress,section,numberOfsection,district,documentNumber,
    county,province,firstname,nationality,size);

  contractInstance.sendDocument(ownerAddress,section,numberOfsection,district,documentNumber,
    county,province,firstname,nationality,size,{ gas: estimateGas },function (error, result) {
     if (!error) {
       console.log("seccess");
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
        //document.getElementById('GsurveyPage').value = result.args. ;
        document.getElementById('Gdistrict').value = result.args.district ;
        document.getElementById('GdocumentNumber').value = result.args.docNo ;
        //document.getElementById('GbookNo').value = result.args. ;
        //document.getElementById('GbookPage').value = result.args. ;
        document.getElementById('Gcounty').value = result.args.county ;
        document.getElementById('Gprovince').value = result.args.province ;
        document.getElementById('Gfirstname').value = result.args.name ;
        //document.getElementById('Glastname').value = result.args. ;
        document.getElementById('Gnationality').value = result.args.nationality ;
        //document.getElementById('GownerAddress').value = result.args. ;
        document.getElementById('Gsize').value = result.args.size ;
     }else{
       console.log("error");
     }
  });
}

function saveTransaction(){

  var transactionNumber = document.getElementById('STtransactionNumber').value ;
  var documentNumber = document.getElementById('STdocumentNumber').value ;
  //var dateToRegistered = document.getElementById('STdateToRegistered').value ;
  var typeOfRegistered = document.getElementById('STtypeOfRegistered').value ;
  var nameGiver = document.getElementById('STnameGiver').value ;
  var nameReceiver = document.getElementById('STnameReceiver').value ;
  //var estateContract = document.getElementById('STestateContract').value ;
  //var estateRemain = document.getElementById('STestateRemain').value ;

  var estimateGas = contractInstance.saveTransaction.estimateGas(transactionNumber,documentNumber,nameGiver,nameReceiver,typeOfRegistered);
  //document.getElementById('noDocGet').innerHTML = contractInstance.getDocument(addr);
  contractInstance.saveTransaction(transactionNumber,documentNumber,nameGiver,nameReceiver,typeOfRegistered,{ gas: estimateGas })
  contractInstance.print_string(function (error, result) {
     if (!error) {
        console.log(result.args.str);
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

function getLastTransaction(){
  var documentNumber = document.getElementById('GTdocumentNumber').value ;
  //var transactionNumber = document.getElementById('STtransactionNumber').value

  var estimateGas = contractInstance.getLastTransaction.estimateGas(documentNumber);
  contractInstance.getLastTransaction(documentNumber,{ gas: estimateGas });
  contractInstance.print_string(function (error, result) {
     if (!error) {
        console.log(result);
        //document.getElementById('GTtransactionNumber').value = result.args. ;
        //document.getElementById('GTdocumentNumber').value = result.args. ;
        //document.getElementById('GTdateToRegistered').value = result.args.str ;
        document.getElementById('GTtypeOfRegistered').value = result.args.str ;
        //document.getElementById('GTnameGiver').value = result.args. ;
        //document.getElementById('GTnameReceiver').value = result.args. ;
        //document.getElementById('GTestateContract').value = result.args. ;
        //document.getElementById('GTestateRemain').value = result.args. ;
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
