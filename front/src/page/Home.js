import './Home.css';
import Feed from './Feed';

function Home(props) {
    return (
        <div id='Home'>
            {
                [1,2,3,4,5].map(item => {
                    return <Feed key={item} />;
                })
            }
        </div>
    );
}

export default Home;