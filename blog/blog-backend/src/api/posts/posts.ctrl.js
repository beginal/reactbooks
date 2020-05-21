import Post from '../../models/post';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if(!ObjectId.isValid(id)) {
    ctx.status = 400;
    return;
  }
  return next();
}

export const write = async ctx => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array()
    .items(Joi.string())
    .required(),
  });

  const result = schema.validate(ctx.request.body);
  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
}

export const list = async ctx => {
  const page = parseInt(ctx.query.page || '1', 10);

  if (page < 1) {
    ctx.status = 400;
    return;
  }
  try {
    const posts = await Post.find()
    .sort({ _id: -1 })
    .limit(10)
    .skip((page -1) * 10)
    .lean()
    .exec(); // find뒤에는 exec가 붙어야 서버에 쿼리를 요청함
    const PostCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(PostCount / 10));
    ctx.body = posts.map(post => ({
      ...post,
      body:
        post.body.length< 200 ? post.body : `${post.body.slice(0, 200)}...`
    }));
  } catch (e) {
    ctx.throw(500, e)
  }
}

export const read = async ctx => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec() // 특정 id를 가진 데이터를 조회할때 쓰는 함수
    if(!post) {
      ctx.status = 404;
      return;
    }
    
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
}

export const remove = async ctx => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e)
  }
}

export const update = async ctx => {
  const { id } = ctx.params;
  const schema = Joi.object().keys({
    title: Joi.string(),
    body:Joi.string(),
    tags:Joi.array().items(Joi.string()),
  });

  const result = schema.validate(ctx.request.body);
  if(result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  try {
   const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
     new: true, // 이 값을 설정하면 업데이트 된 데이터를 return함. false일경우 업데이트 되기 전의 값을 return 
   }).exec();
   ctx.body = post;
  } catch (e) {
    ctx.throw(500, e)
  }
}