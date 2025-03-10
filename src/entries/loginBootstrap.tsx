import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
// import qs from 'query-string';
// import {request} from '@/utils/ajax';
import {getTongjiScript} from './getTongjiScript';
import './index.less';
// import Login from '@/modules/Login';
// import '@/styles';
// import {WithWeirwoodCaughtBoundaryConfigProvider} from './hoc/WithWeirwoodCaughtBoundaryConfigProvider';

declare const window: Window & typeof globalThis & {
    ucCommonLogin: {
        init: (params: object) => void;
    };
};

const main = () => {
    const root = document.createElement('div');
    root.id = 'home';
    getTongjiScript(false); // 没登陆态，统计 userID 策略没用
    ReactDOM.render(
        <BrowserRouter>
            <div className="test">login</div>
        </BrowserRouter>,
        document.body.appendChild(root)
    );
};

main();
