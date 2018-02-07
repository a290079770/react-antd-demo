import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import '../../index.less';

import Login from './login/login.js'
import Reg from './reg/reg.js'
import Info from './info/info.js'
import Commodity from './info/commodity/commodity.js'
import AddCommodity from './info/commodity/addCommodity.js'
import GetCommodity from './info/commodity/getCommodity.js'
import Emp from './info/emp/emp.js';
import ShowEmp from './info/emp/showEmp.js';
import SearchEmp from './info/emp/searchEmp.js';
import AddEmp from './info/emp/addEmp.js';
import AddCommodityImgs from './info/commodity/addCommodityImgs.js';


ReactDOM.render((
       <Router history={hashHistory}>
       	 <Route path='/' component={Login}></Route>
         <Route path='/login/:email' component={Login}></Route>
       	 <Route path='/login' component={Login}></Route>
       	 <Route path='/reg' component={Reg}></Route>
       	 <Route path='/info' component={Info}>
            <IndexRoute component={Commodity} />
            <Route path='commodity' component={Commodity}>
                 <IndexRoute component={AddCommodity} />
                 <Route path='addCommodity' component={AddCommodity}></Route>
                 <Route path='getCommodity' component={GetCommodity}></Route>
                 <Route path='addCommodityImgs/:commId' component={AddCommodityImgs}></Route>
            </Route> 
            <Route path='emp' component={Emp}>
                 <Route path='showEmp' component={ShowEmp}></Route>
                 <Route path='addEmp' component={AddEmp}></Route>
                 <Route path='searchEmp' component={SearchEmp}></Route>
            </Route> 
       	 </Route>
       </Router>
	),app)