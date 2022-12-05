import './MyPost.css';
import * as React from 'react';
import MyPostDetail from './MyPostDetail';

function MyPost(props) {
    return (
        <div id='MyPost'>
            {props.data.map(item => {
                return (
                    <MyPostDetail key={item.id} item={item} refreshMyPage={props.refreshMyPage}/>
                );
            })}
        </div>
    );
}

export default MyPost;