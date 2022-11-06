const { Blog } = require('../Models/BlogModel');

// GET ALL LOGIC
async function getAllLogic(req, res) {
  try {
    const { p = 1, lim = 20 } = req.query; // Paginattion is defaulted to 20 blogs per page.
    const allBlogs = await Blog.find()
      .limit(lim)
      .skip((p - 1) * lim);

    res.status(200).send(allBlogs);
    console.log(allBlogs);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

// GET LIST LOGIC
async function getListLogic(req, res) {
  try {
    const { p = 1, lim = 20 } = req.query; // Pagination is defaulted to 20 blogs per page.
    const blog = await Blog.find()
      .limit(lim)
      .skip((p - 1) * lim);

    const blogList = blog.map(article => {
      return {
        title: article.title,
        state: article.state,
      };
    });

    res.status(200).send(blogList);
    console.log(blogList);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

// CREATE POST LOGIC
async function createPostLogic(req, res) {
  try {
    const newBlog = new Blog(req.body);

    savedBlog = await newBlog.save();

    const successMsg = {
      status: 'Your blog post has been created successfully',
      Blog: savedBlog,
    };

    res.status(201).send(successMsg);

    console.log(successMsg);
  } catch (err) {
    res.status(500).send(err.message);
    console.log(err.message);
  }
}

// UPDATE POST LOGIC
async function updatePostLogic(req, res) {
  try {
    const { id } = req.params;

    const { title, description, state, tags, body } = req.body;

    // let blog = await Blog.findById(id);
    const blog = await Blog.findById(id);

    const { dbTitle, dbDescription, dbState, dbTags, dbBody } = blog;

    if (!blog) {
      return res.status(404).send(`404 Not Found`);
    }

    // blog = req.body;

    blog.title = title || dbTitle;
    blog.description = description || dbDescription;
    blog.state = state || dbState;
    blog.tags = tags || dbTags;
    blog.body = body || dbBody;

    await blog.save();

    res.status(200).send(blog);
    console.log(blog);
  } catch (err) {
    res.send(err.message);
    console.log(err.message);
  }
}

// DELETE POST LOGIC
async function deletePostLogic(req, res) {
  try {
    const { id } = req.params;

    await Blog.deleteOne({ _id: id });

    return res.status(200).send(`Your blog was deleted successfully`);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getAllLogic,
  getListLogic,
  createPostLogic,
  updatePostLogic,
  deletePostLogic,
};
