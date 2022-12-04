import './MyPost.css';

function MyPost(props) {
    return (
        <div id='MyPost'>
            {[1,2,3,4,5,6,7,8,9,10].map(item => {
                return (
                    <div key={item} className='post'>

                    </div>
                );
            })}
        </div>
    );
}

export default MyPost;