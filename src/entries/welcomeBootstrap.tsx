import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {getTongjiScript} from './getTongjiScript';
import './index.less';

const main = () => {
    document.body.style.overscrollBehaviorX = 'none';
    getTongjiScript(false); // 没登陆态，统计 userID 策略没用

    const root = document.createElement('div');
    root.id = 'root';
    ReactDOM.render(
        <BrowserRouter>
            <div className="test">welcome</div>
        </BrowserRouter>,
        document.body.appendChild(root)
    );
};

main();
