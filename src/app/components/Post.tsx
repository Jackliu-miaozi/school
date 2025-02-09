import React from 'react';
import Image from 'next/image';
interface PostProps {
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  category: string;
}

const Post: React.FC<PostProps> = ({
  title,
  content,
  date,
  imageUrl,
  category,
}) => {
  //React.FC 是 "Function Component" 的缩写，表示这是一个 React 函数组件
  //PostProps  是一个泛型参数，指定了这个组件接收的 props 的类型
  //{ title, content, date, imageUrl, category }这是解构参数
  //使用对象解构语法从 props 中直接提取需要的属性
  //props 是属性的缩写 properties
  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{content}</p>
      <p>{date}</p>
      <p>{category}</p>
      <Image
        src={imageUrl}
        alt={title}
        width={500}
        height={500}
      />
    </div>
  );
};

export default Post;
