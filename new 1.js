// The Wikipedia Adventure Mission 1 - Source Editor

( function ( window, document, $, mw, gt ) {

//automatic api:edit function to send yourself messages
function sendMessage( targetPage, msgPage, linkTo ) {
	var api = new mw.Api();
	api.get( {
		'action' : 'query',
		'titles' : msgPage,
		'prop'   : 'revisions|info',
		'intoken' : 'edit',
		'rvprop' : 'content',
		'indexpageids' : 1
	} ).done( function (result) {
		result = result.query;
		var page = result.pages[result.pageids[0]];
		var text = page.revisions[0]['*'];
		api.post( {
			'action' : 'edit',
			'title' : targetPage,
			'appendtext' : "\n" + text,
			'summary' : 'Tin nhắn mới (được mô phỏng tự động như là một phần của [[WP:The Wikipedia Adventure|Phiêu lưu cùng Wikipedia]])',
			'token' : page.edittoken
		} ).done( function () {
			window.location.href = linkTo;
		} );
	} );
}

// Fail gracefully post-save but not postedit
var postEditButtons = [];
if ( mw.config.get( 'wgAction' ) === 'view' && !gt.isPostEdit() ) {
        postEditButtons.push( {
                name: 'Nhấn vào đây để quay lại và thực hiện sửa đổi',
                onclick: function() {
                        window.location.href = new mw.Uri().extend( { action: 'edit' } ).toString();
                }
        } );
}

// Fail gracefully post-save but not postedit for visual editor
var postEditButtonsVisual = [];
if ( mw.config.get( 'wgAction' ) === 'view' && !gt.isPostEdit() ) {
        postEditButtonsVisual.push( {
                name: 'Quay lại',
                onclick: function() {
                        window.location.href = window.location.href +
"&veaction=edit";
                }
        } );
}

gt.defineTour( {
        name: 'twa1',
		shouldLog: true,
        steps: [ {
                //1
                title: 'Chào mừng bạn đến với Wikipedia!',
                description: '<br><div align="left">[[File:TWA_guide_left_top.png|link=]]</div>Wikipedia là một bách khoa toàn thư miễn phí mà <b>bất kì ai cũng có thể sửa đổi được</b>.  Tôi ở đây để dẫn bạn đi tham quan vũ trụ rộng lớn của chúng ta.<br><br>Cuộc hành trình có 7 nhiệm vụ, từng nhiệm vụ có từng kĩ năng và bất ngờ khác nhau, và tất cả được thiết kế để giúp bạn trở thành người đóng góp tuyệt vời cho Wikipedia.<br><br>',
                onShow: gt.parseDescription,
                overlay: true,
                closeOnClickOutside: false,
	            buttons: [ {
                        name: 'Trang bị cho chuyến đi',
                        action: 'next',
                } ],
                allowAutomaticOkay: false	

				
        },  {
                //2
                title: 'Thông tin trước khi lên đường',
                description: '<br><b>ĐỪNG NHẤN NÚT [x] NHÉ!</b><br> Hộp thoại này là bộ đồ không gian của bạn: nếu bạn đóng hộp thoại này trước khi hoàn thành nhiệm vụ đồng nghĩa với việc bạn đã rời khỏi cuộc phiêu lưu và bạn cần phải bắt đầu lại nhiệm vụ từ đầu.<br><br><b>Tự động nhắn tin</b><br> Khi bạn chơi trò chơi này, bạn sẽ gửi một vài tin nhắn tới trang cá nhân Wikipedia của mình, bất cứ khi nào bạn nhìn thấy <big><b>*</b></big> trong nút bấm màu xanh.<br><br><b>Trình soạn thảo trực quan</b><br> Tour du lịch này chỉ sử dụng Trình soạn thảo Mã nguồn, không phải Trình soạn thảo Trực quan.<br><br>',
                onShow: gt.parseDescription,
                overlay: true,
                closeOnClickOutside: false,
		        buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Start' ) + '?tour=twa1&step=1'          
                } , {
                        name: 'Đi cùng tôi nào...',
                        action: 'next',
                         } ],
                allowAutomaticOkay: false		

        },  {
                //3
                title: 'Tại sao lại là Wikipedia?',
                description: '<br><div align="right">[[File:TWA_guide_right_top.png|link=]]</div>Chúng tôi đều có một mục tiêu rất tuyệt vời.  <br><br><b>Hãy mường tượng đến một thế giới mà bất cứ ai trên hành tinh này được truy cập tự do vào kho tổng hợp kiến thức nhân loại.</b><br><br>Điều tuyệt vời nhất là...<br><br>',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Start' ) + '?tour=twa1&step=2'          
                } , {
                         name: 'Nó đang diễn ra',
                         action: 'next',
                         } ],
                allowAutomaticOkay: false				

        },  {
                //4
                title: 'Nó đang diễn ra',
                description: '<br><div align="right">[[File:TWA_guide_right_top.png|link=]]</div>Wikipedia được truy cập nhiều hơn 8000 lần mỗi giây bởi nửa tỉ người hằng tháng. Chúng tôi thuộc top 10 website phi lợi nhuận duy nhất trên thế giới. Và chúng tôi chỉ vừa mời bắt đầu vào năm 2001!<br><br>',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Start' ) + '?tour=twa1&step=3'          
                } , {
                        name: 'Ai viết Wikipedia vậy?',
                        action: 'next',
                         } ],
	            allowAutomaticOkay: false
        },  {
                //5
                title: 'Ai viết Wikipedia vậy?',
                description: '<br><div align="right">[[File:TWA_guide_right_top.png|link=]]</div>Những người như bạn đấy :) Có gần 30 triệu thành viên đã đăng kí. Quan trọng hơn, bạn không phải là một chuyên gia để đóng góp cho Wikipedia. Gần như tất cả biên tập viên của chúng tôi đều là tình nguyện viên.<br><br>',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Start' ) + '?tour=twa1&step=4'          
                } , {
                        name: 'Tại sao người ta lại sửa đổi vậy?',
                        action: 'next',
                         } ],
		        allowAutomaticOkay: false
        },  {

                //6
                title: 'Khám phá vai trò đặc biệt của bạn',
                description: '<br><div align="left">[[File:TWA_guide_left_top.png|link=]]</div>Phần tuyệt vời của Wikipedia là bạn có thể tự mình khám phá hướng đi và mục đích sửa đổi của bản thân.  Nhưng tác động của mỗi người sẽ tạo nên sự khác biệt lớn. Tác động của bạn có thể làm thay đổi cả thế giới.<br><br>',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Start' ) + '?tour=twa1&step=5'          
                } , {
                        name: 'Bạn đã sẵn sàng chưa?',
                        action: 'next',
                         } ],
                allowAutomaticOkay: false,
},  {
                //7
                title: 'Đăng nhập hoặc tạo tài khoản',
                description: '<br><div align="left">[[File:TWA_guide_left_top.png|link=]]</div>Tạo một tài khoản mang lại cho bạn rất nhiều lợi ích hay phía sau.  Hãy bước tới nào!<br><br>',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Start' ) + '?tour=twa1&step=6'  
                } , {
                	name: 'Tôi đã đăng nhập rồi',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Start' ) + '?tour=twa1&step=8'
                        
                } , {
                	name: 'Tôi cần đăng nhập',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:UserLogin' ) + '?tour=twa1&step=7'
                     
                } , {
                	name: 'Đăng kí!',
                    action: 'externalLink',
                    url: mw.config.get('wgServer') + mw.config.get('wgScriptPath') + '/index.php?title=Special:UserLogin&returnto=Wikipedia:TWA/1/Start&returntoquery=tour%3Dtwa1%26step%3D8%26showGettingStarted%3Dfalse&type=signup'
                        
                } ],
                allowAutomaticOkay: false,
                shouldSkip: function () {
                return mw.config.get( 'wgUserId' )  !== null;
                }
				
} , {
                //8
                title: 'Gửi lời Xin chào thế giới',
                description: '<br>  Hãy bắt đầu bằng việc giới thiệu bản thân mình với cộng đồng.<br><br>Chỉ tốn vài giây để nạp cả vũ trụ này lên—chỉ có ánh sáng mới di chuyển nhanh đến thế.<br><br>(Đối với phần còn lại của hành trình, bạn cần phải đăng nhập.)<br><br>',
                overlay: true,
                onShow: gt.parseDescription,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Start' ) + '?tour=twa1&step=6'          
                } , {
                         name: 'Xin chào thế giới*',
                         onclick: function()  {  if(!mw.config.get('wgUserName')){  alert( "Hãy đăng nhập." );   return;   } sendMessage( 'User talk:' + mw.config.get( 'wgUserName' ), 'Wikipedia:TWA/Welcome' , mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=9'); } 
                } ],	
                allowAutomaticOkay: false
				
} , {
                //9
                title: 'Trang cá nhân của bạn',
                description: '<br><div align="right">[[File:TWA_guide_right_top.png|link=]]</div>Trang cá nhân của bạn là nơi giới thiệu cho các biên tập viên khác về bản thân mình. Bạn có thể chia sẻ về quá khứ, sở thích và những gì bản thân muốn đóng góp cho dự án--chia sẻ càng ít hay càng nhiều tuỳ bạn...<br><br><i>Hãy nhớ rằng trang cá nhân của bạn là một trang công khai, vì vậy hãy giữ các thông tin cá nhân của bạn, ừ thì, càng "cá nhân" càng tốt.</i><br><br>',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Start' ) + '?tour=twa1&step=8'          
                } , {
                        name: 'Một trang cá nhân tốt trông như thế nào?',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Wikipedia:TWA/1/Bio' ) + '?tour=twa1&step=10'
                } ],
		allowAutomaticOkay: false
		
} , {
                //10
                title: 'Thử thách bản thân BÊN DƯỚI...',
                description: 'Gợi ý: nếu bạn đã chọn sai thì cũng không sao, Học - Học nữa - Học mãi mà! Và bạn vẫn luôn có cơ hội thử lại!',
                attachTo:'#contentSub',
                position: 'bottom',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                allowAutomaticOkay: false, 
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=9'          
                } ],
               
} , {
                //11
                title: 'Lượt của bạn!',
                description: '<br>Tạo trang cá nhân của bạn trên Wikipedia cũng đơn giản như việc sửa đổi nó.<br><br>Nhấn nút <b>TẠO MÃ NGUỒN</b> hoặc <b>SỬA MÃ NGUỒN</b> bên trên.<br><br>(Cuộc phiêu lưu này luôn luôn sử dụng trình soạn thảo MÃ NGUỒN).<br><br>',
                attachTo: '#ca-edit',
                position: 'bottom',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                allowAutomaticOkay: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=9'          
                } ],
                shouldSkip: function() {
                        return gt.hasQuery( { action: 'edit' } );
                }

}, {
                //12
                title: 'Giao diện sửa đổi',
                description: '<br><div align="right">[[File:TWA_guide_right_top.png|link=]]</div>Đầu tiên, cuộc hành trình này không dùng Trình soạn thảo Trực quan, thế nên cứ nhấn vào TIẾP TỰC SỬA ĐỔI trong hộp thoại bên trái.<br><br> Bây giờ, đây là nơi mà điều kì diệu sắp sửa xảy ra.<br><br>Gõ vào hộp văn bản lớn ở phía trên bên trái:  tên người dùng, thành phố hoặc quốc gia, trình độ học vấn, kĩ năng, và sở thích.  Bạn mong chờ gì từ việc ở <i>đây</i>? Chia sẻ càng ít hay càng nhiều tuỳ bạn, nhưng hãy thực hiện trong ít nhất <b>MỘT</b> sửa đổi.  <br><br>Nếu bạn đã có trang cá nhân rồi, hãy cải thiện nó ít nhất <b>MỘT</b> lần nếu được.<br><br>',
                onShow: gt.parseDescription,
                overlay: false,
                attachTo: '#wpTextbox1', 
                position: 'bottomRight',
                closeOnClickOutside: false,
	            buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=11'          
                } , {
                        name: 'Đã nhập',
                        action: 'next'
               } ],
               
} , {
                //13
                title: 'Tóm lược sửa đổi và Đăng trang',
                description: '<br>Trông đẹp đấy! Trước khi bạn nhấn vào Đăng trang, để lại một ghi chú ngắn gọn về những thay đổi bạn đã thực hiện, những ghi chú này gọi là Tóm lược sửa đổi. Điều này giúp người khác theo dõi và giúp bạn hoàn thành công việc của mình trên Wikipedia.<br><br>Hãy giả sử rằng bạn đã "Giới thiệu bản thân" rồi.<br><br>Giờ tất cả những gì bạn cần làm là Đăng trang. Việc lưu bài giúp sửa đổi của bạn trở nên công khai. Hãy nhấn nút ĐĂNG TRAMG khi bạn đã sẵn sàng.<br><br>',
                onShow: gt.parseDescription,
                overlay: false,
                attachTo:  '#wpSave', 
                position: 'bottomRight',
                closeOnClickOutside: false,
                allowAutomaticOkay: false,
                shouldSkip: function() {
                        return gt.isPostEdit();
                },
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=12&action=edit'          
                } ],
                buttons: postEditButtons

} , {
                //14
                title: 'Chúc mừng bạn!',
                description: 'ĐÃ NHẬN ĐƯỢC CÔNG CỤ MỚI:  <b>Huy hiệu biên tập viên</b><center>[[File:TWA badge 1.png|250px|link=]]</center><br>Nay bạn đã là một biên tập viên Wikipedia! Cảm giác thế nào? Thật tuyệt vì bạn đã giới thiệu bản thân mình với mọi người.<br>',
                overlay: false,
                onShow: gt.parseDescription,
                closeOnClickOutside: false,
                allowAutomaticOkay: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=13&action=edit'          
                } , {
                        name: 'Tôi muốn cải thiện tiếp*',
                        onclick: function()  {  if(!mw.config.get('wgUserName')){  alert( "Hãy đăng nhập." );   return;   } sendMessage( 'User:' + mw.config.get( 'wgUserName' ), 'Wikipedia:TWA/Badge/1template2' , mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=15'); } 
                } ],

} , {
                //15
                title: 'Còn tốt hơn thế',
                description: '<br>Hãy quay trở lại và thực hiện một số thay đổi nhỏ cho văn bản.  Nhấn nút <b>SỬA MÃ NGUỒN</b><br><br>',
                overlay: false,
                attachTo: '#ca-edit',
                position: 'bottom',
                onShow: gt.parseDescription,
                closeOnClickOutside: false,
                allowAutomaticOkay: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=14'          
                } ],
                shouldSkip: function() {
                        return gt.hasQuery( { action: 'edit' } );
                }

} , {
                //16
                title: 'Tô đậm',
                description: '<br><div align="right">[[File:TWA guide right top.png|link=]]</div>Trong hộp thoại văn bản, Tô đậm tên người dùng của bạn (hoặc một cụm từ quan trọng khác) bằng chuột.<br><br>Sau đó nhấn vào nút [[File:OOjs UI icon bold-b.svg]] trên thanh công cụ sửa đổi phía trên hộp thoại.<br><br>Thanh công cụ sửa đôi giúp Wikipedia trông đơn giản hơn, vì nó thêm định dạng cho bạn.',
                attachTo: '#wpTextbox1', 
                position: 'bottomRight',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=15'          
                } , {
                	    name: 'Đã tô đậm',
                        action: 'next'
                } ],

} , {
                //17
                title: 'In nghiêng',
                description: '<br><div align="right">[[File:TWA guide right top.png|link=]]</div>Bây giờ hãy tô đậm những dòng bạn thích.<br><br>Sau đó nhấn vào [[File:OOjs UI icon italic-i.svg]] trên tahnh công cụ sửa đổi để in nghiêng văn bản.<br><br>',
                attachTo: '#wpTextbox1', 
                position: 'bottomRight',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                allowAutomaticOkay: false	,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=16&action=edit'          
                } , {
                	    name: 'Đã in nghiêng',
                        action: 'next'
                } ],

} , {
                //18
                title: 'Thêm liên kết wiki',
                description: '<br><div align="right">[[File:TWA guide right top.png|link=]]</div>Bạn có thể liên kết đến các trang khác trên Wikipedia. Điều này giúp "xây dựng trang web", và giúp chuyển hướng người đọc tới các bài viết khác từ bài viết này ;)<br><br> Tô đậm tên thành phố hoặc quốc gia bạn sinh sống. <br><br>Sau đó nhấn nút [[File:OOjs UI icon link-ltr.svg]] trên thanh công cụ sửa đổi (nút này có hình trông như một cái xích ấy).<br><br>Cuối cùng, NHẬP liên kết vào.<br><br>',
                attachTo: '#wpTextbox1', 
                position: 'bottomRight',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=17&action=edit'          
                } , {
                	    name: 'Đã liên kết Wiki',
                        action: 'next'
                } ],

} , {
                //19
                title: 'Tóm lược sửa đổi và Lưu',
                description: '<br>Bạn đã "tô đậm, in nghiêng, và liên kết wiki" cho văn bản rồi.  Cứ nhấn LƯU đi, và sửa đổi của bạn sẽ được hiển thị.<br><br>',
                attachTo: '#wpSave',
                position: 'bottomRight',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                allowAutomaticOkay: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=18&action=edit'          
                } ],
                shouldSkip: function() {
                        return gt.isPostEdit();
                },
                buttons: postEditButtons

} , {
                //20
                title: 'Bạn làm được rồi :)',
                description: 'ĐÃ NHẬN ĐƯỢC CÔNG CỤ MỚI:  <b>Huy hiệu người định dạng</b><center>[[File:TWA badge 2.png|250px|link=]]</center><br>You\'re learning fast.  You\'re awesome.  We\'re just getting started but already you have the basic tools to go on an adventure. Keep an eye on the skill meter at the bottom of the page as you develop more and more strengths.<br>',
                overlay: true,
                onShow: gt.parseDescription,
                closeOnClickOutside: false,
                buttons: [ {
                        name: '<big>←</big>',
                        action: 'externalLink',
                        url: mw.util.getUrl( 'Special:MyPage' ) + '?tour=twa1&step=19&action=edit'          
                } , {
                        name: 'What\'s next??*',
                        onclick: function()  {  if(!mw.config.get('wgUserName')){  alert( "Hãy đăng nhập." );   return;   } sendMessage( 'User:' + mw.config.get( 'wgUserName' ), 'Wikipedia:TWA/Badge/2template2' , mw.util.getUrl( 'Wikipedia:TWA/1/End' ) + '?tour=twa1&step=21'); } 
                } ],
                allowAutomaticOkay: false

} , {
                //21
                title: 'Hoàn thành Nhiệm vụ 1!',
                description: '<br>[[File:Carl Czerny - Duo Concertante - 1. Allegro (short).ogg]]<br><b>Di chuyển đến nhiệm vụ 2...</b>',
                onShow: gt.parseDescription,
                overlay: false,
                closeOnClickOutside: false,
                buttons: [ {
                	    name: 'Chúc mừng tôi!',
                        action: 'end'      
                } ],


}]

} );
 
} (window, document, jQuery, mediaWiki, mediaWiki.guidedTour ) ) ;
