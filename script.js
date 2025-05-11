async function fetchNews() {
    const response=await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=0siGT61BEoYsrRyQXZVMChh69paVlPVs')
    const posts=await response.json()
    console.log(posts)
    renderNews(posts.results)
}
function renderNews(articles) {
    const container = document.getElementById('news-container');
    container.innerHTML = '';
  
    articles.splice(0,3).forEach(article => {
      const isoString = article.created_date;
      const date = new Date(isoString);
      const formatted = new Intl.DateTimeFormat('en-GB', {
          day: 'numeric',
          month: 'long',
         }).format(date);
      const div = document.createElement('div');
      div.className = 'news-card';
      div.innerHTML = `
        <div id="text-and-image">
            <div id="text-content>
                <p id="byline">${article.byline}    ·    ${formatted} </p>
                <h1 id="title">${article.title}</h1>
                <p id="abstract">${article.abstract}</p>
                <div id="options">
                    <button id="tag">${article.section}</button>
                    <p id="readto">12 min read </p>
                    <p id="dot">·</p>
                    <p id="selectedfor">Selected for you</p>
                </div>
            </div>
        <img src=${article.multimedia[2].url} id="img">
        </div>
      `;
      div.addEventListener('click', () => {
        localStorage.setItem('selectedPost', JSON.stringify(article));
        window.location.href = 'post.html'; 
    });
      container.appendChild(div);
    });
}
fetchNews()