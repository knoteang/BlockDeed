pragma solidity >=0.4.0 <0.6.0;

contract Test_New_version {

    address user;

    event print_document(string doc);
    event print_array(uint[] number);
    //โครงสร้างโฉนดที่ดิน(หน้าแรก)
    struct document {
        address id;
        uint docNo;
        string location;
    }
    mapping(address => document[]) public allDocument;
    //โครงสร้างโฉนดที่ดิน(หน้าหลัง)
    struct transaction {
        uint docNo;
        uint traNo;
        //..other data
        string detail;
    }
    mapping(uint => transaction[]) public allList;
    //โครงสร้างโฉนดที่ดิน(หน้าหลัง)
    struct endtransaction {
        uint traNo;
        //..other data
        bool status;
    }
    mapping(uint => endtransaction) public allEndTransaction;

    constructor() public {
        user = msg.sender;
    }

    //ลงทะเบียนโฉนดที่ดินให้กับผู้ใช้
    function sendDocument(address _id,uint _docNo, string memory _location) public {
        //authen by admin...
        //require
        document memory newDocument = document(_id, _docNo, _location);
        allDocument[_id].push(newDocument);
    }

    // //ลงทะเบียนโฉนดที่ดินให้กับผู้ใช้
    // function sendDocument(address id, uint section, uint numberOfsection, uint surveyPage, string memory district,  uint documentNumber, uint book, uint bookPage, string  memory county, string memory province, string memory fristname,  string memory lastname, string memory nationality, string memory ownerAddress, uint size) public {
    //     //authen by admin...
    //     //require
    //     document memory newDocument = document(id, section, numberOfsection, surveyPage, district, documentNumber, book, bookPage, county, province, fristname, lastname, nationality, ownerAddress, size);
    //     allDocument[_id].push(newDocument);
    // }

    //บันทึกธุรกรรมของโฉนดที่ดิน
    function saveTransaction(uint _docNo,uint _traNo,string memory _datail) public {
        //require
        //ตรวจสอบความถูกต้อง
        if(checkContract(_docNo)){
            transaction memory newTransaction = transaction(_docNo, _traNo, _datail);
            allList[_docNo].push(newTransaction);
        }
    }
    //ยกเลิกพันธะ
    function endTransaction(uint  _traNo) public {
        //require
        //ตรวจสอบความถูกต้อง
        endtransaction memory newEndTransaction =  endtransaction(_traNo, true);
        allEndTransaction[_traNo] = newEndTransaction;
    }
    //แสดงรายละเอียดของโฉนด
    function getDocument(uint _docNo) public {
        //authen by user...
        //require
        document[] memory tmpDoc = allDocument[msg.sender];
        for(uint idx = 0; idx < tmpDoc.length; idx++){
            if(tmpDoc[idx].docNo==_docNo){
                emit print_document(tmpDoc[idx].location);
                return;
            }
        }
    }
    //แสดงธุรกรรมของโฉนด
    function getTransaction(uint _docNo) public {
        //authen by user...
        //require
        uint[] memory output;
        transaction[] memory tmpTran = allList[_docNo];
        for(uint idx = 0; idx < tmpTran.length; idx++){
            output[idx] = tmpTran[idx].traNo; //ออกแบบการส่งออกไปภายนอก
        }
        emit print_array(output);
        return;
    }

    //ตรวจสอบว่าไม่ติดพันธะ
    function checkContract(uint _docNo) private view returns(bool) {
        //authen by user...
        //require
        transaction[] memory tmpTran = allList[_docNo];
        if(tmpTran.length==0){
            return true;
        } else {
            for(uint idx = 0; idx < tmpTran.length; idx++){
                if(allEndTransaction[tmpTran[idx].traNo].status==true){
                    return true;
                }
            }
            return false;
        }
    }
}
