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
        uint identificationNumber,
        uint size);
    event print_arrayuint(uint[] array);
    event print_transaction(uint[] traNo,
        address[] mortgagee,
        uint[] money,
        bool[] status);

    uint private transactionNumber = 0;

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
        uint identificationNumber; //สัญชาติ
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
        uint docNo; // เลขที่โฉนด
        bool status;
    }
    mapping(uint => endtransaction) public allEndTransaction;

    //ลงทะเบียนโฉนดที่ดินให้กับผู้ใช้
    function sendDocument(address id,
    uint section,
    uint numberOfsection,
    string memory district,
    uint docNo,
    string memory county,
    string memory province,
    string memory name,
    uint identificationNumber,
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
        identificationNumber,
        size);
        allDocument[id].push(newDocument);
    }

    //บันทึกธุรกรรมของโฉนดที่ดิน
    function saveTransaction(uint _docNo,address _mortgage,address _mortgagee,uint _money,string memory _datail) public {
        //require
        //require(msg.sender == ธนาคาร);
        //ตรวจสอบความถูกต้อง
        //if(checkContract(_docNo)){
        transaction memory newTransaction = transaction(transactionNumber, _docNo,  _mortgage, _mortgagee, _money, _datail);
        allList[_docNo].push(newTransaction);
        transactionNumber+=1;
        //}else{
          //  emit print_string("fail");
        //}
    }
    //ยกเลิกพันธะ
    function endTransaction(uint _docNo, uint _traNo) public {
        //require
        //require(msg.sender == เลขธนาคาร);
        //ตรวจสอบความถูกต้อง
        endtransaction memory newEndTransaction =  endtransaction(_docNo, _traNo, true);
        allEndTransaction[_traNo] = newEndTransaction;
    }
    //แสดงรายละเอียดของโฉนด
    function getDocument(uint _docNo) public {
        //authen by user...
        document[] memory tmpDoc = allDocument[msg.sender];
        //require

        for(uint idx = 0; idx < tmpDoc.length; idx++){
            if(tmpDoc[idx].docNo==_docNo){
                emit print_document(tmpDoc[idx].section,
                tmpDoc[idx].numberOfsection,
                tmpDoc[idx].district,
                tmpDoc[idx].docNo,
                tmpDoc[idx].county,
                tmpDoc[idx].province,
                tmpDoc[idx].name,
                tmpDoc[idx].identificationNumber,
                tmpDoc[idx].size);
                return;
            }
        }
    }
    //แสดงธุรกรรมของโฉนด
    function getTransaction(uint _docNo) public {
        //authen by user...
        document[] memory tmpDoc = allDocument[msg.sender];
        address docOwner;
        for(uint idx = 0; idx < tmpDoc.length; idx++){
            if(tmpDoc[idx].docNo==_docNo){
                docOwner=tmpDoc[idx].id;
            }
        }
        //require
        //require(docOwner == msg.sender);

        transaction[] memory tmpTran = allList[_docNo];
        uint[] memory traNo = new uint[](tmpTran.length);
        address[] memory mortgagee = new address[](tmpTran.length);
        uint[] memory money = new uint[](tmpTran.length);
        bool[] memory status = new bool[](tmpTran.length);
        for(uint idx = 0; idx < tmpTran.length; idx++){
            traNo[idx] = tmpTran[idx].traNo;
            mortgagee[idx] = tmpTran[idx].mortgagee;
            money[idx] = tmpTran[idx].money;
            if(allEndTransaction[tmpTran[idx].traNo].status){
                status[idx] = true;
            } else {
                status[idx] = false;
            }
        }
        emit print_transaction(traNo,mortgagee,money,status);
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
            if(allEndTransaction[tmpTran[0].traNo].status){
                return true;
            }
            return false;
        }
    }
}
