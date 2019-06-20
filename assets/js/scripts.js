const API_KEY = '3rIm5uGKOAGumoax2UI4uFVwLoY8OMAP';

// nodes of interest
const form = $('#form-nyt');
const searchTerm = $('#search-term');
const records = $('#records');
const startYear = $('#start-year');
const endYear = $('#end-year');

const articleList = $('#article-list');
const buttonSearch = $('#search');
const buttonClear = $('#clear');

buttonSearch.on('click', function(e) {
  e.preventDefault();
  articleList.empty();
  const userSearchTerm = searchTerm.val().trim();
  const userRecords = records.val().trim();
  const userStartYear =
    (startYear.val() && startYear.val().trim() + 0101) || 19700101;
  const userEndYear =
    (endYear.val() && endYear.val().trim() + 0101) || 20190501;
  const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${userSearchTerm}&begin_date=${userStartYear}&end_date=${userEndYear ||
    20190101}&api-key=${API_KEY}`;
  searchAndAppend(URL, userRecords || 10);
  form.trigger('reset');
});

buttonClear.on('click', function(e) {
  e.preventDefault();
  articleList.empty();
});

function searchAndAppend(URL, userRecords) {
  $.ajax({
    method: 'GET',
    url: URL,
  }).then(res => {
    const articles = res.response.docs.slice(0, userRecords);
    console.log(articles);

    articles.map(article => {
      const li = $('<li>');
      const h3 = $('<h3>');
      const small = $('<small>');
      const p = $('<p>');
      const a = $('<a>');

      h3.text(article.headline.main);
      small.text(article.byline.original);
      p.text(article.snippet);
      a.text('read the article at NYT');
      a.attr('href', article.web_url);
      li.append(h3)
        .append(small)
        .append(p)
        .append(a);
      articleList.append(li);
    });
  });
}
