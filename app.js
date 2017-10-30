var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('views', __dirname +'/views');

app.get("/", function(req, res) {
  res.render('index', {
    title: 'Timestamp',
    abstract: '基本API使用：Timestamp微服务',
    stories: {
      0: '把一个字符串作为参数，判断该字符串是不是一个 Unix 时间，或者一个公历日期（例如：January 1, 2016）。',
      1: '如果是，那么它同时返回 Unix 时间戳和公历日期。',
      2: '如果不是，那么它返回 null 。'
    },
    usage: {
      0: 'https://timestamp-ms.herokuapp.com/December%2015,%202015',
      1: 'https://timestamp-ms.herokuapp.com/1450137600'
    },
    result: '{"unix": 1450137600, "natural": "December 15, 2015"}'
  });
});

app.get('/:time', function(req, res) {
  var currentDate = null;
  if (isNaN(req.params.time)) {
    currentDate = new Date(req.params.time);
  } else {
    currentDate = new Date(Number(req.params.time));
  }
  
  var date = null;
  var naturaltime = null;
  if (currentDate != 'Invalid Date' && currentDate.getTime() != null) {
    date = new Date(0 + currentDate.getTime());
    switch (date.getMonth() + 1) {
      case 1:
        naturaltime = 'January';
        break;
      case 2:
        naturaltime = 'February';
        break;
      case 3:
        naturaltime = 'March';
        break;
      case 4:
        naturaltime = 'April';
        break;
      case 5:
        naturaltime = 'May';
        break;
      case 6:
        naturaltime = 'June';
        break;
      case 7:
        naturaltime = 'Junly';
        break;
      case 8:
        naturaltime = 'August';
        break;
      case 9:
        naturaltime = 'September';
        break;
      case 10:
        naturaltime = 'October';
        break;
      case 11:
        naturaltime = 'November';
        break;
      case 12:
        naturaltime = 'December';
        break;
      default:
        throw Error('Unknown Month:' + date.getMonth());
    }
    naturaltime += ' ';
    naturaltime += date.getDate();
    naturaltime += ', ';
    naturaltime += date.getFullYear();
  }
  var time = {
    unix: date === null ? date : date.getTime(),
    natural: naturaltime
  };
  res.end(JSON.stringify(time));
});

app.listen(8080);