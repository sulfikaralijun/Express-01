import { readFile, writeFile } from "../db/dbController.js";

/**
 *@desc     Get all posts
 *@route    GET /api/posts
 */
const getPosts = async (req, res) => {
  const { limit } = req.query;
  if (!isNaN(parseInt(limit)) && limit > 0) {
    return res.status(400).json(posts.slice(0, limit));
  }
  const posts = await readFile();
  res.json(posts);
};

/**
 * @desc    Get post by id
 * @route   GET /api/posts/:id
 */

const getPostById = async (req, res, next) => {
  // get params id
  const { id } = req.params;
  const posts = await readFile();
  const postData = posts.find((post) => post.id === parseInt(id));
  if (!postData) {
    const error = new Error(`Cannot find post with id ${id}`);
    error.status = 404;
    return next(error);
  }
  res.json(postData);
};

/**
 * @desc    post data to database
 * @route   POST /api/post
 */
const createPost = async (req, res, next) => {
  const { title, author, content } = req.body;
  if (!title) {
    const error = new Error(`Please Include the post title`);
    error.status = 404;
    return next(error);
  }
  const posts = await readFile();
  const newData = {
    id: posts.length + 1,
    title,
  };
  posts.push(newData);
  await writeFile(posts);
  res.status(201).json(posts);
};

/**
 * @desc    update data from database
 * @route   PUT /api/posts
 */
const updatePost = async (req, res) => {
  const { id, title } = req.body;
  console.log(id, title);
  if (!id || !title) {
    if (!id) {
      return res.status(400).json({ msg: "Please enter the id" });
    }else if(!title) {
      return res.status(400).json({ msg: "Please enter the title" });
    }else {
      return res.status(400).json({ msg: "Please enter the id and new title" });
    }
  }
  
  const posts = await readFile();

  const objIndex = posts.findIndex((item) => item.id === parseInt(id));
  if (objIndex === -1) return res.status(404).json({ msg: "Post not found" });
  posts[objIndex] = { ...posts[objIndex], title };

  await writeFile(posts);

  res.status(200).json(posts);
};

/**
 * @desc    delete data from db
 * @route   DELETE /api/post
 */
const deletePost = async (req, res, next) => {
  const { id } = req.body;

  let posts = await readFile();

  if (!id) return res.status(400).json({ msg: "Please enter the id" });
  const postData = posts.find((data) => data.id === parseInt(id));
  if (!postData) {
    const error = new Error(`Post with id ${id} not found`)
    error.status = 400
    return next(error);
    // return res.status(400).json({ msg: `Post with id ${id} not found` });

  }

  const newData = posts.filter((data) => data.id !== parseInt(id));
  posts = [...newData];
  await writeFile(posts);
  
  res.status(200).json({message: 'post success deleteing'});
};

export { getPosts, getPostById, createPost, updatePost, deletePost };
