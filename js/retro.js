const loadPost = async (searchText = 'coding') => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`);
    const data = await res.json();
    const posts = data.posts;
    // console.log(posts)
    displayPosts(posts);
}

// post display
const displayPosts = posts => {
    const postsContainer = document.getElementById('posts-container');
    // clear post container cards before adding new card
    postsContainer.innerHTML = '';

    // single post card
    posts.forEach(post => {
        // console.log(post);
        const postCard = document.createElement('div');
        postCard.classList = `flex bg-gray-100 mr-3 py-10 pl-10 pr-16 rounded-3xl shadow-lg mb-6`
        postCard.innerHTML = `
        <div class="profile-picture">
            <div class="indicator">
                <span id = "indicator-color" class="indicator-item badge badge-secondary"></span>
                <div class="bg-base-300 grid h-20 w-20 rounded-xl place-items-center">
                    <img src="${post.image}" alt="">
                </div>
            </div>
        </div>
        <div class="catagory ml-6">
            <p class="inter-font text-sm font-medium text-gray-500"># ${post.category} Author : ${post.author.name}</p>
            <h3 class="text-xl font-bold mt-3 mb-4">${post.title}</h3>
            <p class="inter-font text-base font-normal text-gray-500">${post.description}</p>
            <hr class="border-gray-500 border-dashed my-5">
            <div class="post-bottom-status">
                <ul class="flex gap-x-5 inter-font text-gray-500">
                    <li><i class="fa-regular fa-message  text-2xl mr-2"></i> <span
                            class="text-lg">${post.comment_count}</span></li>
                    <li><i class="fa-regular text-2xl fa-eye mr-2"></i> <span
                            class="text-lg">${post.view_count}</span></li>
                    <li><i class="fa-regular text-2xl fa-clock mr-2"></i><span class="text-lg"> ${post.posted_time}</span></li>
                    <li class="ml-52 text-white bg-green-500 rounded-full px-2 pt-1">
                        <a onclick="postRead('${post.id}')">
                            <i class="fa-solid fa-envelope-open"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        `;
        postsContainer.appendChild(postCard);
    })
}

// handle search button
const handleSearch = () => {
    const searchField = document.getElementById('serarch-field');
    const searchText = searchField.value;
    loadPost(searchText);
}

// mark as read side bar card
const postRead = async (id) => {
    // console.log(id);
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const post = data.posts; 
    // console.log(post);
    
    let title, view;
    for(i=0; i<post.length; i++){
        if(post[i].id == id){
            title = post[i].title;
            view = post[i].view_count;
            break;
        }
    }
    // console.log(view);
    // console.log(title);

    const markRead = document.getElementById('mark-read');
    const markReadTitle = document.createElement('div');
    markReadTitle.classList = `flex mt-3 bg-white mx-6 p-4 rounded-xl shadow-lg`;
    markReadTitle.innerHTML = `
    <p class="text-base font-semibold">${title}</p>
     <i class="fa-regular text-2xl fa-eye mr-2"></i> <span class="text-lg">${view}</span>
    `;
    markRead.appendChild(markReadTitle);
}

loadPost()