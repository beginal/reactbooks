import Post from './models/post';

export default function createFakeData() {
  const posts = [...Array(40).keys()].map(i => ({
    title: `포스트 #${i}`,
    body: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore, soluta! Exercitationem voluptates rem porro. Sapiente adipisci dolorum deserunt commodi in dolorem incidunt sequi ratione, rerum illo, harum ipsam expedita provident.`,
    tags: ['가짜','data'],
  }));
  Post.insertMany(posts, (err, docs) => {
    console.log(docs);
  })
}