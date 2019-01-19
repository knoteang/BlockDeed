pragma solidity >=0.4.0 <0.6.0;


contract Test_FullData {

    event print_string(string str);
    event print_uint(uint size);
    event print_document(uint section,
        uint numberOfsection,
        string district,
        uint docNo,
        string county,
        string province,
        string name,
        string nationality,
        uint size);
    event print_arrayuint(uint[] array);
    event print_transaction(uint[] traNo,
        address[] mortgagee,
        uint[] money);

    //โครงสร้างโฉนดที่ดิน(หน้าแรก)  ในทางปฏิบัติเลขที่โฉนดมันจะซ้ำตามอำเภอ ดังนั้นอาจจะมีการะบุkeyเพิ่ม
    struct document {
        address id;
        //1. ตำแหน่งที่ดิน
        uint section; //ระวาง
        uint numberOfsection; //เลขที่ดิน
        string district; //ตำบล
        //2.โฉนดที่ดิน
        uint docNo; // เลขที่โฉนด
        string county; //อำเภอ
        string province; //จังหวัด
        //3.ระบุตัวเจ้าของ
        string name; // เอา frisname+lastname
        string nationality; //สัญชาติ
        //4.ที่ดินนี้มีเนื้อแหลงขนาด
        uint size;
        //5.รูปส่วนแผนที่>รูปแผนที่ มาตราส่วน ตำแหน่งทิศ วันที่ออก ลงชื่อเจ้าพนักงานที่ดิน
    }
    mapping(address => document[]) public allDocument;
    //โครงสร้างโฉนดที่ดิน(หน้าหลัง)
    struct transaction {
        uint traNo;
        //..other data
        uint docNo; // เลขที่โฉนด
        address mortgage; // ผู้ให้จำนอง
        address mortgagee; // ผู้รับจำนอง
        uint money; // จำนวนเงิน
        string detail; // เงื่อนไขการจำนอง
    }
    mapping(uint => transaction[]) public allList;



    //โครงสร้างโฉนดที่ดิน(หน้าหลัง)
    struct endtransaction {
        uint traNo;
        //..other data
        bool status;
    }
    mapping(uint => endtransaction[]) public allEndTransaction;

    //ลงทะเบียนโฉนดที่ดินให้กับผู้ใช้
    function sendDocument(address id,
    uint section,
    uint numberOfsection,
    string memory district,
    uint docNo,
    string memory county,
    string memory province,
    string memory name,
    string memory nationality,
    uint size) public {
        //authen by admin...
        //require
        document memory newDocument = document(id,
        section,
        numberOfsection,
        district,
        docNo,
        county,
        province,
        name,
        nationality,
        size);
        allDocument[id].push(newDocument);
    }

    //บันทึกธุรกรรมของโฉนดที่ดิน
    function saveTransaction(uint _docNo,address _mortgage,address _mortgagee,uint _money,string memory _datail) public {
        //require
        //ตรวจสอบความถูกต้อง
        //if(checkContract(_docNo)){
        // uint _traNo=1;
        // for(uint idx = 0; idx < allList.length; idx++){
        //     _traNo=_traNo+allList[idx].length;
        // }
        transaction[] memory tmpTran = allList[_docNo];
        uint _traNo = tmpTran.length; // แก้ไข ให้ไม่ติดบัค ****
        transaction memory newTransaction = transaction(_traNo, _docNo,  _mortgage, _mortgagee, _money, _datail);
        allList[_docNo].push(newTransaction);
        //}else{
          //  emit print_string("fail");
        //}
    }
    //ยกเลิกพันธะ
    function endTransaction(uint _docNo, uint _traNo) public {
        //require
        //ตรวจสอบความถูกต้อง
        endtransaction memory newEndTransaction =  endtransaction(_traNo, true);
        allEndTransaction[_docNo].push(newEndTransaction);
    }
    //แสดงรายละเอียดของโฉนด
    function getDocument(uint _docNo) public {
        //authen by user...
        //require
        document[] memory tmpDoc = allDocument[msg.sender];
        for(uint idx = 0; idx < tmpDoc.length; idx++){
            if(tmpDoc[idx].docNo==_docNo){
                emit print_document(tmpDoc[idx].section,
                tmpDoc[idx].numberOfsection,
                tmpDoc[idx].district,
                tmpDoc[idx].docNo,
                tmpDoc[idx].county,
                tmpDoc[idx].province,
                tmpDoc[idx].name,
                tmpDoc[idx].nationality,
                tmpDoc[idx].size);
                return;
            }
        }
    }
    //แสดงธุรกรรมของโฉนด แสดงธุรกรรมสุดท้าย กำลังหาวิธีแสดงทั่งอาเรย์
    function getLastTransaction(uint _docNo) public {
        //authen by user...
        //require
        transaction[] memory tmpTran = allList[_docNo];
        emit print_string(tmpTran[0].detail);
        return;
    }

    function getTransaction(uint _docNo) public {
        //authen by user...
        //require
        transaction[] memory tmpTran = allList[_docNo];
        uint[] memory traNo = new uint[](tmpTran.length);
        address[] memory mortgagee = new address[](tmpTran.length);
        uint[] memory money = new uint[](tmpTran.length);
        for(uint idx = 0; idx < tmpTran.length; idx++){
            traNo[idx] = tmpTran[idx].traNo;
            mortgagee[idx] = tmpTran[idx].mortgagee;
            money[idx] = tmpTran[idx].money;
        }
        emit print_transaction(traNo,mortgagee,money);
        return;
    }

    //ตรวจสอบว่าไม่ติดพันธะ
    function checkContract(uint _docNo) private view returns(bool) {
        //authen by user...
        //require
        transaction[] memory tmpTran = allList[_docNo];
        endtransaction[] memory tmpEndTran = allEndTransaction[_docNo];
        if(tmpTran.length==0){
            return true;
        } else {
            for(uint idx = 0; idx < tmpEndTran.length; idx++){
                if(tmpEndTran[idx].traNo==tmpTran[0].traNo){
                    return true;
                }
            }
            return false;
        }
    }
}
