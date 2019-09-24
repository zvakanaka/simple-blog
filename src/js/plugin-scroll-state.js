const scrollContainer = document.querySelector('.main');
let currentPost;
document.addEventListener('postLoaded', function updateCurrrentPost(ev) {
  currentPost = ev.detail.name;
  console.log(`setting scrollTop:${currentPost} to ${sessionStorage.getItem(`scrollTop:${currentPost}`)}`);
  scrollContainer.scrollTop = sessionStorage.getItem(`scrollTop:${currentPost}`);
});
scrollContainer.addEventListener('scroll', () => sessionStorage.setItem(`scrollTop:${currentPost}`, scrollContainer.scrollTop));
