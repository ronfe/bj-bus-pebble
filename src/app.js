/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var main = new UI.Card({
    title: 'Pebble.js',
    icon: 'images/menu_icon.png',
    subtitle: 'Hello World!',
    body: 'Press any button.'
});

main.show();

var URL = 'http://www.bjbus.com/home/ajax_search_bus_stop.php?act=busTime&selBLine=622&selBDir=5327505317773260570&selBStop=7';
var regex = /\d+m?(?=\\"><i +class=\\"bus[cs]\\")/g;

var sendRequest = function(){
    ajax({
            url: URL,
            type: 'GET'
        }, function(data){
            var b = data;
            var resArray = b.match(regex);
			var outArray = [];
			if (resArray.length >= 1){
				for (var i = 0; i < resArray.length; i++){
					var tempArr = resArray[i].split('m');
					if (tempArr.length === 1){
						outArray.push(Number(tempArr[0]));
					}
					else {
						outArray.push(Number(tempArr[0]) - 0.5);
					}
				}
				console.log(outArray);
			}
		}, function(err){
			console.log(err);
		});
};
setInterval(sendRequest, 10000);


main.on('click', 'up', function(e) {
	var menu = new UI.Menu({
		sections: [{
			items: [{
				title: 'Pebble.js',
				icon: 'images/menu_icon.png',
				subtitle: 'Can do Menus'
			}, {
				title: 'Second Item',
				subtitle: 'Subtitle Text'
			}]
		}]
	});
	menu.on('select', function(e) {
		console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
		console.log('The item is titled "' + e.item.title + '"');
	});
	menu.show();
});

main.on('click', 'select', function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});

main.on('click', 'down', function(e) {
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
});
