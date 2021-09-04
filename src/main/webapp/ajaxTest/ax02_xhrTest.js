// 1. 통신 담당 객체 준비
// => XMLHttpRequest 객체 생성
// 2. 요청을 실행
// => 클라이언트로부터 요청 이벤트 발생시 실행되는 메서드:startMethod() 작성 
//       -> 생성된  XMLHttpRequest 객체 를 이용해서
//            요청준비 (결과처리를 담당할 메서드를 지정) -> 요청 설정 -> 보냄
// 3. 결과처리
// => 결과처리 담당 메서드 작성
// => 응답 결과가 오면 자동 실행

// ** 실습
// 1. 
var xhrObj; // XMLHttpRequest객체를 저장할 변수를 전역변수로 선언
function createXHR() {
	if(window.ActiveXObject) {
		//웹 브라우저가 IE5.0, IE6.0인 경우
		xhrObj = new ActiveXObhext("Microsoft.XMLHTTP");
	}else if(window.XMLHttpRequest) {
		//웹 브라우저가 IE7.0 이상, 크롬, 파이어폭스, 사파리, 오페라등의 경우
		xhrObj = new XMLHttpRequest();
	}
 } //creatXHR
 
 // 2. 
function startMethod() {
   // 2.1) 객체생성
   createXHR();
   // 2.2) Response를 담당할 메서드를 지정 
   // => 응답처리를 위한 이 메서드는 () 없이 이름만 기술해야 한다. 
   xhrObj.onreadystatechange=resultF;
   // 2.3) 요청설정
   xhrObj.open('Get','../inputCheck/ic01_JSsubmit.html',true);
            // Get 방식, 요청페이지(url), 비동기적 통신이면 "true"
   // 2.4) 요청전송
   xhrObj.send(null);
} //startMethod 

// => Make QueryString
function getParameterValues() {
   var id = document.getElementById('id').value;
   var password = document.getElementById('password').value;
   var name = document.getElementById('name').value;
   return 'id='+id+'&password='+password+'&name='+name;
} //getParameterValues

// => JS_Parameter , Get방식
function startMethodG() {
   createXHR();
   xhrObj.onreadystatechange=resultF;
   xhrObj.open('Get','ax03_parameterResult.jsp?'+getParameterValues(),true);
   xhrObj.send(null);
} //startMethodG 

// => JS_Parameter , Post방식
function startMethodP() {
   createXHR();
   xhrObj.onreadystatechange=resultF;
   xhrObj.open('Post','ax03_parameterResult.jsp',true);
   xhrObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8'); //한글처리
   xhrObj.send(getParameterValues());
} //startMethodG 

// 3. 
function resultF() {
	if(xhrObj.readyState==4 ) {
 		// 요청객체의 상태가 모든 데이터를 받을 수 있는 상태로 완료된 경우
 		if (xhrObj.status==200) { // 정상 Response Status 
 			document.getElementById('resultArea').innerHTML
 				='** 서버 Response => <br>'+ xhrObj.responseText;
 				// xhrObj.responseText : 문자열로 이루어진 서버의 응답
 		}//if_200
 	}//if_4
 }//resultF