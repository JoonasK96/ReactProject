/* eslint-disable max-len */
import React from 'react';
import {FlatList} from 'react-native';
import CommentListItem from './CommentListItem';
import PropTypes from 'prop-types';
import {useComments} from '../hooks/APIhooks';

const CommentList = ({fileId}) => {
  const comments = useComments(fileId);
  console.log('kommentit: ', comments);
  return (
    <FlatList
      data={comments}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) =>
        <CommentListItem singleComment={item} />}
    />
  );
};

CommentList.propTypes = {
  fileId: PropTypes.number,
};

export default CommentList;
