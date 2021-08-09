const elasticsearch = require('elasticsearch');

function getReport(md5, callback) {
  var search =
  {
    index: 'file-behavior-report-*',
    type: 'report',
    body: {
      query: {
        "bool": { "must": [{ "match": { "md5": md5.toUpperCase() } }], "must_not": [], "should": [] }
      },
      "from": 0,
      "size": 1,
      "sort": [],
      "aggs": {}
    }
  };
  getES(search, function (data) {
    callback(data);
  });
}

function getES(searchInfo, callback) {
  const esClient = new elasticsearch.Client({
    host: 'http://193.168.15.210:9200/',
    log: 'error'
  });
  esClient.search(searchInfo).then(function (re) {
    callback(re.hits.hits);
  }, function (err) {
    console.trace(err.message);
  });
}