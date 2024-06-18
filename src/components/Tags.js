import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTags } from '../features/tags/tagsSlice';
import Tag from './Tag';

const Tags = () => {
  const { tags } = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTags());
  }, [dispatch]);

  return (
    <section>
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
      {tags?.map((tag) => (
        <Tag title={tag.title} key={tag.id} />
      ))}
    </div>
    </section>
  );
};

export default Tags;
