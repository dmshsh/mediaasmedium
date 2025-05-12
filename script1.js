async function fetchNews() {
    const response=await fetch('https://api.nytimes.com/svc/topstories/v2/home.json?api-key=0siGT61BEoYsrRyQXZVMChh69paVlPVs')
    const posts=await response.json()
    console.log(posts)
    renderNews(posts.results)
}
function renderNews(articles) {
    const backButton = document.createElement('button');
    backButton.id='backbutton'
    backButton.addEventListener('click',()=>{
      window.location.href='index.html';
    });
    document.body.appendChild(backButton)
    const container = document.getElementById('post-container');
    container.innerHTML = '';
    const post = JSON.parse(localStorage.getItem('selectedPost'));
    if (!post) {
        container.innerHTML = '<p>Post not found.</p>';
        return;
    }
    const isoString = post.created_date;
    const date = new Date(isoString);
    const formatted = new Intl.DateTimeFormat('en-GB', {
          day: 'numeric',
          month: 'long',
         }).format(date);
    const div = document.createElement('div');
    div.className = 'post-card';
    div.innerHTML = `
        <div id='header'>
            <div id='head-text'>
                <p id='author'>${post.byline}</p>
                <p id='descr'>${formatted} · 12 min read · Member-only</p>
            </div>
            <div id='head-buttons'>
                <button id='linkedin'></button>
                <button id='facebook'></button>
                <button id='twitter'></button>
            </div>
        </div>
        <div id='titlediv'>
            <p id='title'>${post.title}</p>
            <p id='abstract'>${post.abstract}</p>
        </div>
        <img src=${post.multimedia[2].url} id="imge">
        <div id='subheader'>
            <p id='subhead'>Subheader</p>
            <p id='description'>${post.abstract}</p>
        </div>
        <div id='footer'>
            <div id='heart-comment'>
                <p id='like'>♡180</p>
                <p id='comment'>💬12</p>
            </div>
            <img src='/assets/photos/saved.png' id='imgsaved'>
        </div>
        <div class="custom-line"></div>
      `;

      container.appendChild(div);
    
}
fetchNews()
