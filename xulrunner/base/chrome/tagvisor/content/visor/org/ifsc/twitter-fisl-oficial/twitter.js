c     = require("choreographer");
timer = require("timer");

var twitter =  {
	name   : __appName,
        target : __targetName,
        targetId : __targetId,

	crop    : "50",
	title   : "Twitter 10",
	feedURL : "http://twitter.com/statuses/user_timeline/14386212.rss",
	feed    : null, 

	style : <><![CDATA[
		

		.tweetauthor2 { 
			color:blue; 
			font-size:11px;
		} 

		.postitpanel {                        
			color:black;                        
			display:inline-block;
                        background-color:#ff8;
                        font-size:22px;
			overflow:hidden;
                        font-weight:bold;                        
                        margin:15px;
			margin-left:7px;
			margin-top:0px;
                        padding:10px;
                        width:286px;
                        height:213px;
			-moz-box-shadow: rgba(0,0,0,.4) 10px 10px 10px;
                }

	]]></>, 


	start : function() {

		this.element = this._coreDoc.createElement('div');
		this.element.className="twitterPanel";
		this.element.id = Math.random();
		this.tweetQueue = new Array();

		var first = this._coreDoc.createElement("div");
	//	this.firstId = "firsttwitter"+Math.random();
	//	first.id = this.firstId;

		this.tweetRepeated = {};

		this.element.appendChild(first);

		this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		var self = this;
		timer.setTimeout( function(){self.updateFeed()},1000);

	},

	init : function () { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 

		this.feed = new this._service_google.feeds.Feed(this.feedURL);
		this.feed.setResultFormat(this._service_google.feeds.Feed.XML_FORMAT);
		this.feed.setNumEntries(10);



	} ,
	popTweet : function() {
		if (this.tweetQueue.length == 0) return false;
		var t = this.tweetQueue.pop();
		if (t in this.tweetRepeated) {
			return;
		}
		this.tweetRepeated[t] = true;
		var k = this._coreDoc.createElement('span');
		k.className = 'postitpanel';
		k.innerHTML = t;
		this.element.insertBefore(k, this.element.firstChild);
		return true;
	},

	updateFeed : function() {
		if (! this.popTweet()) {
			var self =this; 
			this.feed.load( function (e) {  self.__feedUpdated(e) } );
		}
		var self = this;
		timer.setTimeout( function(){self.updateFeed()},30000);
	},

	__feedUpdated : function(result) {
		var i;
		if (result.error) {
			return;
		}
		var items = result.xmlDocument.getElementsByTagName("item");

                for (var i = 0; i < items.length; i++) {

		//for (i = 0; i < result.feed.entries.length; i++) {
      var titleElement = items[i].getElementsByTagName("title")[0];
      var title = titleElement.firstChild.nodeValue;

/*
      var authorElement = items[i].getElementsByTagName("author")[0];
      var author = authorElement.firstChild.nodeValue;
*/

     // var imgElement = items[i].getElementsByTagNameNS("http://search.yahoo.com/mrss/","content")[0];
     // var img = imgElement.getAttribute("url");

			//if (result.feed.entries[i]) {
				//this.tweetQueue.push(  result.feed.entries[i].title + ' <span class="tweetauthor2">(by @ ' + result.feed.entries[i].author.replace(/ \(.*$/,'') + ')</span>');
				this.tweetQueue.push( '<span class="tweetauthor2">(@FISL)</span> ' + title);
			//}
		//}
		}

		//this.lastid = result.feed.entries[i-1].link.match(/\d+$/);
		//this.feed = new this._service_google.feeds.Feed(this.feedURL + '&since_id=' + this.lastid);
		//this.feed.setNumEntries(10);
	}

}

c.register(twitter);

